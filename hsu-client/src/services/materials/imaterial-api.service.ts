import { Observable } from 'rxjs';
import {
  CreateMaterialInput,
  CreateSpecificationGroupInput,
  CreateSpecificationInput,
  MaterialDto,
  SpecificationDto,
  SpecificationGroupDto,
  UpdateMaterialInput,
  UpdateSpecificationGroupInput,
  UpdateSpecificationInput
} from '../../shared/service-proxies/service-proxies';

export abstract class IMaterialApiService {
  abstract getAll(): Observable<MaterialDto[]>;
  abstract create(input: CreateMaterialInput): Observable<MaterialDto>;
  abstract update(materialId: number, input: UpdateMaterialInput): Observable<MaterialDto>;
  abstract deleteMaterial(materialId: number): Observable<void>;
  abstract createSpecification(materialId: number, input: CreateSpecificationInput): Observable<SpecificationDto>;
  abstract updateSpecification(specificationId: number, input: UpdateSpecificationInput): Observable<SpecificationDto>;
  abstract deleteSpecification(specificationId: number): Observable<void>;
  abstract createSpecificationGroup(materialGroupId: number, input: CreateSpecificationGroupInput): Observable<SpecificationGroupDto>;
  abstract updateSpecificationGroup(groupId: number, input: UpdateSpecificationGroupInput): Observable<SpecificationGroupDto>;
  abstract deleteSpecificationGroup(groupId: number): Observable<void>;
}
