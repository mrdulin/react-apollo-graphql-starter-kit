import fun from './example';

export async function init(props: any) {
  if (fun()) {
    console.log('doSomething');
  }
}
