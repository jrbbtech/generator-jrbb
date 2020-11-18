export const run = async (event: any) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Team!',
        input: event,
      },
      null,
      2
    ),
  };
};
