export const obj = {
  DataTable: () => {
    return {
      columns: () => {
        return {
          data: () => {
            return {
              eq: () => {
                return {
                  indexOf: () => 'real data',
                };
              },
            };
          },
        };
      },
    };
  },
};
