"""Module for exporting Galaxy workflows to CWL abstract interface."""
import argparse
import sys
from typing import Any, Dict

from gxformat2._scripts import ensure_format2
from gxformat2._yaml import ordered_dump, ordered_load
from gxformat2.converter import steps_as_list
from gxformat2.normalize import ensure_implicit_step_outs, walk_id_list_or_dict

CWL_VERSION = "v1.2.0-dev5"

SCRIPT_DESCRIPTION = """
This script converts the an executable Galaxy workflow (in either format -
Format 2 or native .ga) into an abstract CWL representation.

In order to represent Galaxy tool executions in the Common Workflow Language
workflow language, they are serialized as v1.2+ abstract 'Operation' classes.
Because abstract 'Operation' classes are used, the resulting CWL workflow is
not executable - either in Galaxy or by CWL implementations. The resulting CWL
file should be thought of more as a common metadata specification describing
the workflow structure.
"""


def from_dict(workflow_dict: dict, subworkflow=False):
    """Convert dictified Galaxy workflow into abstract CWL representation."""
    # TODO: pass some sort of flag to ensure_format2 to make sure information
    # about step outputs that may be present in native format is not lost when
    # converting to Format2.
    workflow_dict = ensure_format2(workflow_dict)
    ensure_implicit_step_outs(workflow_dict)

    requirements = {}  # type: Dict[str, Any]
    abstract_dict = {
        'class': 'Workflow',
    }  # type: Dict[str, Any]
    if not subworkflow:
        abstract_dict["cwlVersion"] = CWL_VERSION
    # inputs and outputs already mostly in CWL format...
    abstract_dict["inputs"] = _format2_inputs_to_abstract(workflow_dict.get("inputs", {}))
    abstract_dict["outputs"] = _format2_outputs_to_abstract(workflow_dict.get("outputs", {}))
    steps = {}
    for format2_step in steps_as_list(workflow_dict):
        steps[format2_step["label"]] = _format2_step_to_abstract(format2_step, requirements=requirements)

    abstract_dict["steps"] = steps
    if requirements:
        abstract_dict['requirements'] = requirements
    return abstract_dict


def _format2_step_to_abstract(format2_step, requirements):
    """Convert Format2 step CWL 1.2+ abstract operation."""
    abstract_step = {}
    if "run" in format2_step:
        # probably encountered in subworkflow.
        format2_run = format2_step["run"]
        format2_run_class = format2_run["class"]
        requirements["SubworkflowFeatureRequirement"] = {}
        if format2_run_class == "GalaxyWorkflow":
            # preprocess to ensure it has outs - should the original call be recursive?
            ensure_implicit_step_outs(format2_run)
            step_run = from_dict(format2_run, subworkflow=True)
            abstract_step["run"] = step_run
        else:
            raise NotImplementedError("Unknown runnabled type encountered [%s]" % format2_run_class)
    else:
        step_run = {
            "class": "Operation",
            "doc": format2_step.get("doc", ""),
            "inputs": {},  # TODO
            "outputs": {},  # TODO
        }
        abstract_step["run"] = step_run
    abstract_step["in"] = _format2_in_to_abstract(format2_step.get("in", []))
    abstract_step["out"] = _format2_out_to_abstract(format2_step.get("out", []))
    return abstract_step


def _format2_in_to_abstract(in_dict):
    """Convert Format2 'in' dict for step into CWL abstract 'in' dict."""
    return in_dict


def _format2_out_to_abstract(out):
    """Convert Format2 'out' list for step into CWL abstract 'out' list."""
    cwl_out = []
    if isinstance(out, dict):
        for out_name, out_def in out.items():
            # discard PJA info when converting to abstract CWL
            cwl_out.append(out_name)
    else:
        cwl_out = out
    return cwl_out


def _format2_inputs_to_abstract(inputs):
    """Strip Galaxy extensions or namespace them."""
    abstract_inputs = {}

    for input_name, input_def in walk_id_list_or_dict(inputs):
        if isinstance(input_def, dict):
            input_type = input_def.get("type")
        else:
            input_type = input_def
            input_def = {"type": input_type}

        if input_type == "data":
            input_def["type"] = "File"

        _format2_type_to_abstract(input_def)

        # Strip off Galaxy extensions
        input_def.pop("position", None)
        abstract_inputs[input_name] = input_def

    return abstract_inputs


def _format2_type_to_abstract(has_type):
    format2_type = has_type.pop("type")
    if format2_type == "data":
        cwl_type = "File"
    elif format2_type == "collection":
        # TODO: handled nested collections, pairs, etc...
        cwl_type = "File[]"
    else:
        cwl_type = format2_type
    optional = has_type.pop("optional", False)
    if optional:
        cwl_type += "?"
    has_type["type"] = cwl_type


def _format2_outputs_to_abstract(outputs):
    """Strip Galaxy extensions or namespace them."""
    for output_name, output in walk_id_list_or_dict(outputs):
        if "type" not in output:
            output["type"] = "File"
    return outputs


def main(argv=None):
    """Entry point for script to export abstract interface."""
    if argv is None:
        argv = sys.argv[1:]

    args = _parser().parse_args(argv)

    workflow_path = args.input_path
    output_path = args.output_path or (workflow_path + ".abstract.cwl")

    if workflow_path == "-":
        workflow_dict = ordered_load(sys.stdin)
    else:
        with open(workflow_path, "r") as f:
            workflow_dict = ordered_load(f)

    abstract_dict = from_dict(workflow_dict)
    with open(output_path, "w") as f:
        ordered_dump(abstract_dict, f)

    return 0


def _parser():
    parser = argparse.ArgumentParser(description=SCRIPT_DESCRIPTION)
    parser.add_argument('input_path', metavar='INPUT', type=str,
                        help='input workflow path (.ga/gxwf.yml)')
    parser.add_argument('output_path', metavar='OUTPUT', type=str, nargs="?",
                        help='output workflow path (.cwl)')
    return parser


if __name__ == "__main__":
    sys.exit(main())


__all__ = ('main', 'from_dict')