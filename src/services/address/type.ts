export interface Province {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
  province_id?: number;
}

export interface Subdistrict {
  id: number;
  name: string;
  city_id?: number;
}

export interface ProvinceResponse {
  data: Province[];
}

export interface DistrictResponse {
  data: District[];
}

export interface SubdistrictResponse {
  data: Subdistrict[];
}
