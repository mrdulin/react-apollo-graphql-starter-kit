import { from, Observable } from 'rxjs';

class MyClass {
  public toTest(): Observable<boolean> {
    return from(
      async (): Promise<boolean> => {
        return new Promise((resolve) => {
          resolve(true);
        });
      },
    );
  }
}

export { MyClass };
