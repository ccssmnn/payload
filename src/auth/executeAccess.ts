import { Access } from '../config/types';
import { Forbidden } from '../errors';

const executeAccess = async (operation, access) => {
  if (access) {
    const result = await access(operation);

    if (!result) {
      if (!operation.disableErrors) throw new Forbidden();
    }

    return result;
  }

  if (operation.req.user) {
    return true;
  }

  if (!operation.disableErrors) throw new Forbidden();
  return false;
};

export default executeAccess;
