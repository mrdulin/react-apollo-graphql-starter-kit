import axios from 'axios';

export function saveCourse(course) {
  const baseUrl = 'http://example.com/';
  const config = {
    method: course.id ? 'PUT' : 'POST',
    url: baseUrl + (course.id || ''),
    headers: { 'content-type': 'application/json' },
    data: course,
  };
  return axios(config)
    .then((res) => {
      if (res.status === 201 || res.status === 200) return res.data;
      if (res.status === 400) {
        const error = res.text();
        throw new Error(error);
      }
    })
    .catch((err) => console.log(err));
}
