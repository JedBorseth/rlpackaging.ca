export type SearchCatalogTypes = {
  result: {
    items?: [
      {
        itemData?: {
          name?: string;
          description?: string;
          taxIds?: string[];
          variations: any;
          productType?: string;
          skipModifierScreen?: boolean;
          descriptionHtml?: string;
          descriptionPlaintext?: string;
          isArchived?: boolean;
        };
        id: string;
        updatedAt: string;
        version: bigint;
        isDeleted: boolean;
        presentAtAllLocations: boolean;
        inventoryCount: number;
      }
    ];
  };
};

export type retrieveCatalogTypes =
  | {
      object: {
        type: string;
        id: string;
        updatedAt: string;
        version: bigint;
        isDeleted: boolean;
        presentAtAllLocations: boolean;
        itemData: {
          name: string;
          description: string;
          taxIds: string[];
          variations: any;
          productType: string;
          skipModifierScreen: boolean;
          imageIds: string[];
          descriptionHtml: string;
          descriptionPlaintext: string;
          isArchived: boolean;
        };
      };
    }
  | undefined;
