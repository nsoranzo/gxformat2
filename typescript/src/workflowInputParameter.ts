
import {
  Dictionary,
  expandUrl,
  loadField,
  LoaderInstances,
  LoadingOptions,
  Saveable,
  ValidationException,
  prefixUrl,
  save,
  saveRelativeUri
} from './util/internal'
import { v4 as uuidv4 } from 'uuid'
import * as Internal from './util/internal'


/**
 * Auto-generated class implementation for https://galaxyproject.org/gxformat2/v19_09#WorkflowInputParameter
 */
export class WorkflowInputParameter extends Saveable implements Internal.InputParameter, Internal.HasStepPosition {
  loadingOptions: LoadingOptions
  extensionFields?: Dictionary<any>

  /**
   * The unique identifier for this object.
   */
  id: undefined | string

  /**
   * A short, human-readable label of this object.
   */
  label: undefined | string

  /**
   * A documentation string for this object, or an array of strings which should be concatenated.
   */
  doc: undefined | string | Array<string>

  /**
   * The default value to use for this parameter if the parameter is missing
   * from the input object, or if the value of the parameter in the input
   * object is `null`.  Default values are applied before evaluating expressions
   * (e.g. dependent `valueFrom` fields).
   * 
   */
  default_: undefined | any
  position: undefined | Internal.StepPosition

  /**
   * Specify valid types of data that may be assigned to this parameter.
   * 
   */
  type: string | undefined

  /**
   * If set to true, `WorkflowInputParameter` is not required to submit the workflow.
   * 
   */
  optional: boolean | undefined

  /**
   * Specify datatype extension for valid input datasets.
   * 
   */
  format: undefined | Array<string>

  /**
   * Collection type (defaults to `list` if `type` is `collection`). Nested
   * collection types are separated with colons, e.g. `list:list:paired`.
   * 
   */
  collection_type: undefined | string


  constructor ({extensionFields, loadingOptions, id, label, doc, default_, position, type, optional, format, collection_type} : {extensionFields?: Dictionary<any>, loadingOptions?: LoadingOptions,  label: undefined | string, doc: undefined | string | Array<string>, id: undefined | string, default_: undefined | any, position: undefined | Internal.StepPosition, type: string | undefined, optional: boolean | undefined, format: undefined | Array<string>, collection_type: undefined | string,}) {
    super()
    this.extensionFields = extensionFields ?? {}
    this.loadingOptions = loadingOptions ?? new LoadingOptions({})
    this.id = id
    this.label = label
    this.doc = doc
    this.default_ = default_
    this.position = position
    this.type = type
    this.optional = optional
    this.format = format
    this.collection_type = collection_type
  }

  /**
   * Used to construct instances of {@link WorkflowInputParameter }.
   *
   * @param __doc                           Document fragment to load this record object from.
   * @param baseuri                         Base URI to generate child document IDs against.
   * @param loadingOptions                  Context for loading URIs and populating objects.
   * @param docRoot                         ID at this position in the document (if available)
   * @returns                               An instance of {@link WorkflowInputParameter }
   * @throws {@link ValidationException}    If the document fragment is not a
   *                                        {@link Dictionary} or validation of fields fails.
   */
  static override async fromDoc (__doc: any, baseuri: string, loadingOptions: LoadingOptions,
    docRoot?: string): Promise<Saveable> {
    const _doc = Object.assign({}, __doc)
    const errors: ValidationException[] = []
            
    let id
    if ('id' in _doc) {
      try {
        id = await loadField(_doc.id, LoaderInstances.uriunionOfundefinedtypeOrstrtypeTrueFalseNone,
          baseuri, loadingOptions)
      } catch (e) {
        if (e instanceof ValidationException) {
          errors.push(
            new ValidationException('the `id` field is not valid because: ', [e])
          )
        }
      }
    }

    const originalidIsUndefined = (id === undefined)
    if (originalidIsUndefined ) {
      if (docRoot != null) {
        id = docRoot
      } else {
        id = "_" + uuidv4()
      }
    } else {
      baseuri = id as string
    }
            
    let label
    if ('label' in _doc) {
      try {
        label = await loadField(_doc.label, LoaderInstances.unionOfundefinedtypeOrstrtype,
          baseuri, loadingOptions)
      } catch (e) {
        if (e instanceof ValidationException) {
          errors.push(
            new ValidationException('the `label` field is not valid because: ', [e])
          )
        }
      }
    }

    let doc
    if ('doc' in _doc) {
      try {
        doc = await loadField(_doc.doc, LoaderInstances.unionOfundefinedtypeOrstrtypeOrarrayOfstrtype,
          baseuri, loadingOptions)
      } catch (e) {
        if (e instanceof ValidationException) {
          errors.push(
            new ValidationException('the `doc` field is not valid because: ', [e])
          )
        }
      }
    }

    let default_
    if ('default' in _doc) {
      try {
        default_ = await loadField(_doc.default, LoaderInstances.unionOfundefinedtypeOranyType,
          baseuri, loadingOptions)
      } catch (e) {
        if (e instanceof ValidationException) {
          errors.push(
            new ValidationException('the `default` field is not valid because: ', [e])
          )
        }
      }
    }

    let position
    if ('position' in _doc) {
      try {
        position = await loadField(_doc.position, LoaderInstances.unionOfundefinedtypeOrStepPositionLoader,
          baseuri, loadingOptions)
      } catch (e) {
        if (e instanceof ValidationException) {
          errors.push(
            new ValidationException('the `position` field is not valid because: ', [e])
          )
        }
      }
    }

    let type
    if ('type' in _doc) {
      try {
        type = await loadField(_doc.type, LoaderInstances.typedslunionOfGalaxyTypeLoaderOrstrtypeOrundefinedtype2,
          baseuri, loadingOptions)
      } catch (e) {
        if (e instanceof ValidationException) {
          errors.push(
            new ValidationException('the `type` field is not valid because: ', [e])
          )
        }
      }
    }

    let optional
    if ('optional' in _doc) {
      try {
        optional = await loadField(_doc.optional, LoaderInstances.unionOfbooltypeOrundefinedtype,
          baseuri, loadingOptions)
      } catch (e) {
        if (e instanceof ValidationException) {
          errors.push(
            new ValidationException('the `optional` field is not valid because: ', [e])
          )
        }
      }
    }

    let format
    if ('format' in _doc) {
      try {
        format = await loadField(_doc.format, LoaderInstances.unionOfundefinedtypeOrarrayOfstrtype,
          baseuri, loadingOptions)
      } catch (e) {
        if (e instanceof ValidationException) {
          errors.push(
            new ValidationException('the `format` field is not valid because: ', [e])
          )
        }
      }
    }

    let collection_type
    if ('collection_type' in _doc) {
      try {
        collection_type = await loadField(_doc.collection_type, LoaderInstances.unionOfundefinedtypeOrstrtype,
          baseuri, loadingOptions)
      } catch (e) {
        if (e instanceof ValidationException) {
          errors.push(
            new ValidationException('the `collection_type` field is not valid because: ', [e])
          )
        }
      }
    }

    const extensionFields: Dictionary<any> = {}
    for (const [key, value] of _doc) {
      if (!this.attr.has(key)) {
        if ((key as string).includes(':')) {
          const ex = expandUrl(key, '', loadingOptions, false, false)
          extensionFields[ex] = value
        } else {
          errors.push(
            new ValidationException(`invalid field ${key as string}, \
            expected one of: \`label\`,\`doc\`,\`id\`,\`default\`,\`position\`,\`type\`,\`optional\`,\`format\`,\`collection_type\``)
          )
          break
        }
      }
    }

    if (errors.length > 0) {
      throw new ValidationException("Trying 'WorkflowInputParameter'", errors)
    }

    const schema = new WorkflowInputParameter({
      extensionFields: extensionFields,
      loadingOptions: loadingOptions,
      label: label,
      doc: doc,
      id: id,
      default_: default_,
      position: position,
      type: type,
      optional: optional,
      format: format,
      collection_type: collection_type
    })
    return schema
  }
        
  save (top: boolean = false, baseUrl: string = '', relativeUris: boolean = true)
  : Dictionary<any> {
    const r: Dictionary<any> = {}
    for (const ef in this.extensionFields) {
      r[prefixUrl(ef, this.loadingOptions.vocab)] = this.extensionFields.ef
    }

    if (this.id != null) {
      const u = saveRelativeUri(this.id, baseUrl, true,
                                relativeUris, undefined)
      if (u != null) {
        r.id = u
      }
    }
                
    if (this.label != null) {
      r.label = save(this.label, false, this.id, relativeUris)
    }
                
    if (this.doc != null) {
      r.doc = save(this.doc, false, this.id, relativeUris)
    }
                
    if (this.default_ != null) {
      r.default = save(this.default_, false, this.id, relativeUris)
    }
                
    if (this.position != null) {
      r.position = save(this.position, false, this.id, relativeUris)
    }
                
    if (this.type != null) {
      r.type = save(this.type, false, this.id, relativeUris)
    }
                
    if (this.optional != null) {
      r.optional = save(this.optional, false, this.id, relativeUris)
    }
                
    if (this.format != null) {
      r.format = save(this.format, false, this.id, relativeUris)
    }
                
    if (this.collection_type != null) {
      r.collection_type = save(this.collection_type, false, this.id, relativeUris)
    }
                
    if (top) {
      if (this.loadingOptions.namespaces != null) {
        r.$namespaces = this.loadingOptions.namespaces
      }
      if (this.loadingOptions.schemas != null) {
        r.$schemas = this.loadingOptions.schemas
      }
    }
    return r
  }
            
  static attr: Set<string> = new Set(['label','doc','id','default','position','type','optional','format','collection_type'])
}
