"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductListTable from "./ui/ProductListTable";
import { deleteStoreProduct, getProductList } from "./model/productApi";
import ProductDetail from "./ui/ProductDetail";
import SplitPane from "../../../../../../shared/components/ui/SplitPaneProps";

export default function Produt() {
  const [selectProductId, setSelectProductId] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);
  const params = useParams(); // 👈 params는 객체로 리턴됨
  const storeId =Number(params.storeId);
  const init = async () => {
    try{
      const response = await getProductList(storeId );
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
    const prevId = selectProductId;
    try {
      const response = await getProductList(storeId);
      if (response.result === "SUCCESS") {
        setData(response.data ?? []);
        if (response.data?.some((opt: any) => opt.id === prevId)) {
          setSelectProductId(prevId);
        }

      } else {
        alert(response.message);
      }
    } catch (err: any) {
      alert(err.message || "데이터 로드 실패");
    }
  };

  const deleteProduct = async (id:number) => {
    const prevId = selectProductId;
    try {
      const response = await deleteStoreProduct(storeId,id);
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
      top={<ProductListTable products={data} refresh={refresh} setSelectProductId={setSelectProductId} deleteAction={deleteProduct} selectedProductId={Number(selectProductId)} />}
      bottom={<ProductDetail storeId={storeId}  storeProductId={selectProductId} refresh={refresh} />}
      initialTopRatio={50}
      minRatio={20}
      maxRatio={80}
    />
  );
  
}