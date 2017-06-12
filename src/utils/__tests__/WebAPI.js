import { getAuthErrorsFromResponse } from '../WebAPI';

it('returns validation errors', () => {
  expect(
    getAuthErrorsFromResponse({
      response: {
        data: [
          {
            field: 'field1',
            message: 'error1',
          },
          {
            field: 'field2',
            message: 'error2',
          },
        ],
      },
    }),
  ).toEqual({
    field1: 'error1',
    field2: 'error2',
  });
});
