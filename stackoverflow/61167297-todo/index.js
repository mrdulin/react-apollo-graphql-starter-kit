import { call } from './call';

export function* downloadReports(action) {
  const downloadPdf = 'report.pdf';
  const res = yield call(downloadPdf, action.payload);
  console.log('res:', res);
  const url = window.URL.createObjectURL(new Blob([res]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'report.pdf');
  document.body.appendChild(link);
  link.click();
}
