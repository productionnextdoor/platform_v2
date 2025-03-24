export interface IProductPermissions {
  overview: IRolePermissions;
  base: ICrudPermissions;
  detailsOverview: IRoleBasedPermissions;
  generalInfo: ICrudPermissions;
  materialGroups: ICrudPermissions;
  productVariants: ICrudPermissions;
  fileUploadInfo: ICrudPermissions;
  fileUpload: IFilesPermissions;
}

export interface IProfileCrudPermissions {
  get: string;
  update: string;
}

export interface IProfiles {
  CurrentAdminProfile: string;
  CurrentDeveloperProfile: string;
  CurrentProducerProfile: string;
  AdminProfile: IProfileCrudPermissions;
  DeveloperProfile: IProfileCrudPermissions;
  ProducerProfile: IProfileCrudPermissions;
}

export interface IUserPermissions {
  getDevelopers: string;
  getProducers: string;
  profiles: IProfiles
}

export interface ICrudPermissions {
  get: string;
  createOrUpdate: string;
}

export interface IRoleBasedPermissions {
  getAdmin: string;
  getDeveloper: string;
  getProducers: string;

}


export interface IFilesPermissions {
  upload: string;
  download: string;
  delete: string;
}

export interface IRolePermissions {
  admin: string;
  developer: string;
  producer: string;
}

export interface IGraphPermissions {
  getGraphData: string;
}

export interface IStatesPermissions {
  create: string;
  update: string;
  delete: string;
}

export interface IValueChainPlaningPermissions {
  graph: IGraphPermissions
  steps: ICrudPermissions
  states: IStatesPermissions
}

export interface  IOrderManagement {
  overview: {
    admin: string
    producer: string
  };
  details: {
    admin: string,
    producer: string
  }
}

export interface IExportPermissions {
  product: string;
  statistics:string
}

export interface IPermissions {
  products: IProductPermissions;
  users: IUserPermissions;
  valueChainPlanning: IValueChainPlaningPermissions;
  orderManagement: IOrderManagement
  importExport: IExportPermissions
}

export const PERMISSIONS: IPermissions = {
  orderManagement: {
    overview: {
      admin: 'Hsu.OrderManagement.Overview.Get.Admin',
      producer: 'Hsu.OrderManagement.Overview.Get.Producer',
    },
    details: {
      admin: 'Hsu.OrderManagement.OrderDetails.Admin',
      producer: 'Hsu.OrderManagement.OrderDetails.Producer'
    }
  },
  valueChainPlanning: {
    graph: {
      getGraphData: 'Hsu.ValueChainPlanning.GetProductGraphData'
    },
    steps: {
      get: 'Hsu.ValueChainPlanning.ProductionSteps.Get',
      createOrUpdate: 'Hsu.ValueChainPlanning.ProductionSteps.Set',
    },
    states: {
      create: 'Hsu.ValueChainPlanning.States.Create',
      update: 'Hsu.ValueChainPlanning.States.Update',
      delete: 'Hsu.ValueChainPlanning.States.Delete',
    }
  },
  products: {
    overview: {
      admin: 'Hsu.Product.Overview.Admin',
      developer: 'Hsu.Product.Overview.Developer',
      producer: 'Hsu.Product.Overview.Producer',
    },
    detailsOverview: {
      getAdmin: 'Hsu.Product.Details.Overview.Get.Admin',
      getDeveloper: 'Hsu.Product.Details.Overview.Get.Developer',
      getProducers: 'Hsu.Product.Details.Overview.Get.Producer'
    },
    base: {
      get: 'Hsu.Product.Base.Get',
      createOrUpdate: 'Hsu.Product.Base.CreateOrUpdate'
    },
    generalInfo: {
      get: 'Hsu.Product.Details.GeneralInfo.Get',
      createOrUpdate: 'Hsu.Product.Details.GeneralInfo.CreateOrUpdate'
    },
    materialGroups: {
      get: 'Hsu.Product.Details._MaterialGroups.Get',
      createOrUpdate: 'Hsu.Product.Details.MaterialGroups.CreateOrUpdate'
    },
    productVariants: {
      get: 'Hsu.Product.Details.ProductVariants.Get',
      createOrUpdate: 'Hsu.Product.Details.ProductVariants.CreateOrUpdate'
    },
    fileUploadInfo: {
      get: 'Hsu.Product.Details.ProductFiles.Get',
      createOrUpdate: 'Hsu.Product.Details.ProductFiles.CreateOrUpdate'
    },
    fileUpload: {
      upload: 'Hsu.Product.Files.Upload',
      download: 'Hsu.Product.Files.Download',
      delete: 'Hsu.Product.Files.Delete'
    }
  },
  users: {
    getDevelopers: 'Hsu.ExtendedUser.GetDevelopers',
    getProducers: 'Hsu.ExtendedUser.GetProducer',
    profiles: {
      CurrentAdminProfile: 'Hsu.ExtendedUser.Profiles.CurrentAdmin',
      CurrentDeveloperProfile: 'Hsu.ExtendedUser.Profiles.CurrentDeveloper',
      CurrentProducerProfile: 'Hsu.ExtendedUser.Profiles.CurrentProducer',
      AdminProfile: {
        get: 'Hsu.ExtendedUser.Profiles.Admin.Get',
        update: 'Hsu.ExtendedUser.Profiles.Admin.Update'
      },
      DeveloperProfile: {
        get: 'Hsu.ExtendedUser.Profiles.Developer.Get',
        update: 'Hsu.ExtendedUser.Profiles.Developer.Update'
      },
      ProducerProfile: {
        get: 'Hsu.ExtendedUser.Profiles.Producer.Get',
        update: 'Hsu.ExtendedUser.Profiles.Producer.Update'
      },
    }
  },
  importExport: {
    product:'Hsu.ImportExport.ProductExport',
    statistics: 'Hsu.ImportExport.StatisticsExport'
  }
};
