import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMaterialApiService } from './imaterial-api.service';
import {
  CreateMaterialInput,
  CreateSpecificationGroupInput,
  CreateSpecificationInput,
  MaterialDto,
  MaterialServiceProxy,
  SpecificationDto,
  SpecificationGroupDto,
  SpecificationGroupServiceProxy,
  UpdateMaterialInput,
  UpdateSpecificationGroupInput,
  UpdateSpecificationInput,
  SpecificationServiceProxy
} from '../../shared/service-proxies/service-proxies';

@Injectable()
export class MaterialApiService extends IMaterialApiService {

  constructor(
    private readonly materialServiceProxy: MaterialServiceProxy,
    private readonly specificationServiceProxy: SpecificationServiceProxy,
    private readonly specificationGroupServiceProxy: SpecificationGroupServiceProxy
  ) {
    super();
  }

  getAll(): Observable<MaterialDto[]> {
    return this.materialServiceProxy.getAll();
  }

  create(input: CreateMaterialInput): Observable<MaterialDto> {
    return this.materialServiceProxy.create(input);
  }

  update(materialId: number, input: UpdateMaterialInput): Observable<MaterialDto> {
    return this.materialServiceProxy.update(materialId, input);
  }

  deleteMaterial(materialId: number): Observable<void> {
    return this.materialServiceProxy.delete(materialId);
  }

  createSpecification(materialId: number, input: CreateSpecificationInput): Observable<SpecificationDto> {
    return this.specificationServiceProxy.create(materialId, input);
  }

  updateSpecification(specificationId: number, input: UpdateSpecificationInput): Observable<SpecificationDto> {
    return this.specificationServiceProxy.update(specificationId, input);
  }

  deleteSpecification(specificationId: number): Observable<void> {
    return this.specificationServiceProxy.delete(specificationId);
  }

  createSpecificationGroup(materialGroupId: number, input: CreateSpecificationGroupInput): Observable<SpecificationGroupDto> {
    return this.specificationGroupServiceProxy.create(materialGroupId, input);
  }

  updateSpecificationGroup(groupId: number, input: UpdateSpecificationGroupInput): Observable<SpecificationGroupDto> {
    return this.specificationGroupServiceProxy.update(groupId, input);
  }

  deleteSpecificationGroup(groupId: number): Observable<void> {
    return this.specificationGroupServiceProxy.delete(groupId);
  }
}
