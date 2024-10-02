import { commonEnvironment } from './environment.common';
const env: Partial<typeof commonEnvironment> = { production: true, isAdmin : false };
export const environment = { ...commonEnvironment, ...env };





