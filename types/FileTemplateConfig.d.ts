/**
 * Config for setting the source and destination of a confg job.
 *
 * @interface FileTemplateConfig
 */
interface FileTemplateConfig {
  /**
   * the cli command that triggers the specific template.
   * must match the template filename as well.
   *
   * @type {string}
   * @memberof FileTemplateConfig
   */
  command: string;
  /**
   * the mimetype - what kind of template is it?
   *
   * @type {("numbers" | "pages")}
   * @memberof FileTemplateConfig
   */
  mimetype: "numbers" | "pages";
  /**
   * the absolute location of where the resulting file should go.
   *
   * @type {string}
   * @memberof FileTemplateConfig
   */
  destination: string;
  /**
   * the period of time in which the file recurs.
   *
   * @type {("weekly" | "monthly" | "trimesterly" | "yearly")}
   * @memberof FileTemplateConfig
   */
  duration: "weekly" | "monthly" | "trimesterly" | "yearly";
  /**
   * any additional resources that need to be opened in order for
   * the user to complete the document.
   *
   * @type {string[]}
   * @memberof FileTemplateConfig
   */
  additionalUrls?: string[];
}
