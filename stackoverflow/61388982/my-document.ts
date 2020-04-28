class Typegoose {
  public getModelForClass(cls) {
    return cls.toString();
  }
}

export class MyDocument extends Typegoose {}

export const MyDocumentModel = new MyDocument().getModelForClass(MyDocument);
