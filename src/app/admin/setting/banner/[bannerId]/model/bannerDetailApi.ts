
import { apiFetch } from "../../../../../../../shared/api/base";
import { Response } from "../../../../../../../shared/commonResponse/commonType";
import { BannerDetail } from "./bannerTypes";

export async function getBannerDetail( bannerId : number ): Promise<Response<BannerDetail>> {
 const res = await apiFetch(`/api/v1/banner/${bannerId}`, {
    method: "GET",
 });

  return res as Response<BannerDetail>;
}


export async function updateBanner( bannerId : number , formData : any ): Promise<Response<BannerDetail>> {
  const res = await apiFetch(`/api/v1/banner/${bannerId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
  });

  return res as Response<BannerDetail>;
}