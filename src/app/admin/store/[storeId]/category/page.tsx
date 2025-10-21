"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SplitPane from "../../../../../../shared/components/ui/SplitPaneProps";
import { deleteStoreProductCategory, getStoreProductCategoryList } from "./model/CategoryApi";
import CategoryListTable from "./ui/CategoryListTable";
import CategoryDetail from "./ui/CategoryDetail";

export default function Category() {
  const [selectStoreProductCategoryId, setSelectStoreProductCategoryId] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);
  const params = useParams(); // 👈 params는 객체로 리턴됨
  const storeId =Number(params.storeId);
  const init = async () => {
    try{
      const response = await getStoreProductCategoryList(storeId );
      if (response.result === "SUCCESS") {
          setData(response.data ?? []);      
      } else {
        alert(response.message);
      }
    } catch (err: any) {
      alert(err.message || "데이터 로드 실패");
    }
  }

  const refresh = async () => {
    const prevId = selectStoreProductCategoryId;
    try {
      const response = await getStoreProductCategoryList(storeId);
      if (response.result === "SUCCESS") {
        setData(response.data ?? []);
        if (response.data?.some((opt: any) => opt.id === prevId)) {
          setSelectStoreProductCategoryId(prevId);
        }

      } else {
        alert(response.message);
      }
    } catch (err: any) {
      alert(err.message || "데이터 로드 실패");
    }
  };

  
  const deleteCategory = async (id:number) => {
    try {
      const response = await deleteStoreProductCategory(storeId,id);
      if (response.result === "SUCCESS") {
        init();
      } else {
        alert(response.message);
      }
    } catch (err: any) {
      alert(err.message || "데이터 로드 실패");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return   (
    <SplitPane
      top={<CategoryListTable categorys={data} refresh={refresh} setSelectCategoryId={setSelectStoreProductCategoryId }  deleteAction={deleteCategory} selectStoreProductCategoryId={Number(selectStoreProductCategoryId)} />}
      bottom={<CategoryDetail storeId={storeId}  storeProductCategoryId={selectStoreProductCategoryId} refresh={refresh} />}
      initialTopRatio={50}
      minRatio={20}
      maxRatio={80}
    />
  );
  
}