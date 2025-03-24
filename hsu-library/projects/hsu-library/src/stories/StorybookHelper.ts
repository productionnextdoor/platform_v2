// eslint-disable-next-line @typescript-eslint/ban-types
import { Args } from '@storybook/types';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/types';

export type StoryFn = (args: Args) => StoryFnAngularReturnType;

class StorybookHelper {
  /*
   * This function can be used to generate a storybook template for a component that uses ng-content.
   *
   * Example:
   * `export const Template = RenderNgContent('pm-card', cardData);`
   *
   * Remember to also define the `ngContent` property in the `cardData` object in the example above.
   */
  public RenderNgContent(tag: string, props: Args = {}, ngContentKey: string = 'ngContent'): StoryFn {
    return (args: Args): StoryFnAngularReturnType => {
      const combinedProps: Args = {
        ...props,
        ...args,
      };
      return {
        props: combinedProps,
        template: this.getTemplate(tag, combinedProps, ngContentKey)
      };
    }
  }

  private getTemplate(tag: string, args: Args, ngContentKey: string): string {
    // Get all props in string format except for the ngContent property
    const propsStr: string = Object.keys(args).reduce((prev: string, curr: string): string => {
      if (curr === ngContentKey) {
        return prev;
      }

      return `${prev} ${this.stringifyArg(args, curr)}`;
    }, '');

    const content: string = String(args[ngContentKey] ?? '');

    // Handle empty content templates
    if (content === '') {
      return `<${tag} ${propsStr}/>`;
    }

    return `<${tag} ${propsStr}>${content}</${tag}>`;
  }

  // eslint-disable-next-line complexity
  private stringifyArg(args: Args, key: string): string {
    const type: string = typeof args[key];

    switch (type) {
    case 'function':
      return `(${key})="${key}($event)"`;
    case 'string':
      return `[${key}]="'${args[key]}'"`;
    case 'boolean':
      return `[${key}]="${args[key] ? 'true' : 'false'}"`;
    case 'number':
      return `[${key}]=${args[key]}`;
    case 'object':
      return `[${key}]='${JSON.stringify(args[key])}'`;
    default:
      return `[${key}]="${args[key]}"`;
    }
  }
}

export const storybookHelper: StorybookHelper = new StorybookHelper();
