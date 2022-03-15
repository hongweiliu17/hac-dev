import { ComponentModel } from '../models';
import { k8sDeleteResource } from './../dynamic-plugin-sdk';

/**
 * Delete Component CR
 *
 * @param component component data TODO: Data might change based on the API requirements
 * @param application application name
 * @returns A promise
 *
 * TODO: Return type any should be changed to a proper type like K8sResourceCommon
 */
export const deleteComponent = (componentName: string, namespace: string): any => {
  const componentData = {
    apiVersion: `${ComponentModel.apiGroup}/${ComponentModel.apiVersion}`,
    kind: 'Component',
    metadata: {
      name: componentName,
      namespace,
    },
  };
  // TODO: Make Api Calls here
  return k8sDeleteResource({
    model: ComponentModel,
    resource: componentData,
  });
};