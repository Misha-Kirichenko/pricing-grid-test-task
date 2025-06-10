export const messageUtil = {
  SUCCESS: {
    created: (data: string): string => `${data} was successfully created!`,
    updated: (data: string): string => `${data} was successfully updated`,
  },
  ERRORS: {
    exists: (data: string): string => `${data} already exists!`,
    notFound: (data: string): string =>
      data.endsWith('s') ? `${data} were not found!` : `${data} was not found!`,
  },
};
