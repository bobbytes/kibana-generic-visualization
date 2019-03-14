import 'reflect-metadata';

type TType<T> = new (...args: any[]) => T;

export class Injector {
  private instances = new Map();

  public resolve<T>(target: TType<any>): T {
    const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
    const injections = tokens.map((token: TType<any>) => this.resolve<any>(token));

    const classInstance = this.instances.get(target);

    if (classInstance) {
      return classInstance;
    }

    const newClassInstance = new target(...injections);
    this.instances.set(target, newClassInstance);

    return newClassInstance;
  }
}

export const injector = new Injector();

/**
 * decorator
 */
export const Inject = (): (target: TType<any>) => void => {
  return (target: TType<any>) => target;
};
