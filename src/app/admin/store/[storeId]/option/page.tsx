"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SplitPane from "../../../../../../shared/components/ui/SplitPaneProps";
import { deleteStoreProductOption, getOptionList } from "./model/optionApi";
import OptionListTable from "./ui/OptionListTable";
import OptionDetail from "./ui/OptionDetail";

export default function Option() {
  const [selectOptionId, setSelectOptionId] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);
  const params = useParams(); // 👈 params는 객체로 리턴됨
  const storeId =Number(params.storeId);
  const init = async () => {
    try{
      const response = await getOptionList(storeId );
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
    const prevId = selectOptionId;
    try {

      const response = await getOptionList(storeId);
      if (response.result === "SUCCESS") {
        setData(response.data ?? []);
        if (response.data?.some((opt: any) => opt.id === prevId)) {
          setSelectOptionId(prevId);
        }
      } else {
        alert(response.message);
      }
    } catch (err: any) {
      alert(err.message || "데이터 로드 실패");
    }
  };

  const deleteOption = async (id:number) => {
    try {

      const response = await deleteStoreProductOption(storeId,id);
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
      top={<OptionListTable options={data} refresh={refresh} setSelectOptionId={setSelectOptionId} deleteAction={deleteOption} selectOptionId={Number(selectOptionId)} />}
      bottom={<OptionDetail storeId={storeId} storeProductOptionId={selectOptionId}  refresh={refresh}/>}
      initialTopRatio={50}
      minRatio={20}
      maxRatio={80}
    />
  );
  
}