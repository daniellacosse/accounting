[Accounting CLI](../README.md) > [FileTemplateConfig](../interfaces/filetemplateconfig.md)

# Interface: FileTemplateConfig

Config for setting the source and destination of a confg job.

*__interface__*: FileTemplateConfig

## Hierarchy

**FileTemplateConfig**

## Index

### Properties

* [additionalUrls](filetemplateconfig.md#additionalurls)
* [command](filetemplateconfig.md#command)
* [destination](filetemplateconfig.md#destination)
* [duration](filetemplateconfig.md#duration)
* [mimetype](filetemplateconfig.md#mimetype)

---

## Properties

<a id="additionalurls"></a>

### `<Optional>` additionalUrls

**● additionalUrls**: *`string`[]*

*Defined in [types/FileTemplateConfig.d.ts:43](https://github.com/daniellacosse/accounting-cli/blob/e203785/types/FileTemplateConfig.d.ts#L43)*

any additional resources that need to be opened in order for the user to complete the document.

*__type__*: {string\[\]}

*__memberof__*: FileTemplateConfig

___
<a id="command"></a>

###  command

**● command**: *`string`*

*Defined in [types/FileTemplateConfig.d.ts:14](https://github.com/daniellacosse/accounting-cli/blob/e203785/types/FileTemplateConfig.d.ts#L14)*

the cli command that triggers the specific template. must match the template filename as well.

*__type__*: {string}

*__memberof__*: FileTemplateConfig

___
<a id="destination"></a>

###  destination

**● destination**: *`string`*

*Defined in [types/FileTemplateConfig.d.ts:28](https://github.com/daniellacosse/accounting-cli/blob/e203785/types/FileTemplateConfig.d.ts#L28)*

the absolute location of where the resulting file should go.

*__type__*: {string}

*__memberof__*: FileTemplateConfig

___
<a id="duration"></a>

###  duration

**● duration**: *"weekly" \| "monthly" \| "trimesterly" \| "yearly"*

*Defined in [types/FileTemplateConfig.d.ts:35](https://github.com/daniellacosse/accounting-cli/blob/e203785/types/FileTemplateConfig.d.ts#L35)*

the period of time in which the file recurs.

*__type__*: {("weekly" \| "monthly" \| "trimesterly" \| "yearly")}

*__memberof__*: FileTemplateConfig

___
<a id="mimetype"></a>

###  mimetype

**● mimetype**: *"numbers" \| "pages"*

*Defined in [types/FileTemplateConfig.d.ts:21](https://github.com/daniellacosse/accounting-cli/blob/e203785/types/FileTemplateConfig.d.ts#L21)*

the mimetype - what kind of template is it

*__type__*: {("numbers" \| "pages")}

*__memberof__*: FileTemplateConfig

___

