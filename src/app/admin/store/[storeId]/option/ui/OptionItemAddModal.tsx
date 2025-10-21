
export default function OptionItemAdd({ storeId ,  storeProductOptionId  }: { storeId : number ; storeProductOptionId:number | null} ) {
  


return ( <div className="min-h-screen bg-gray-50 flex flex-col">
    <header className="bg-white shadow p-4 font-semibold text-gray-800">
        옵션 아이템 등록
    </header>

    <main className="flex-1 p-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border max-w-lg mx-auto">
        <form className="space-y-4">
            {/* input fields */}
        </form>
        </div>
    </main>

    <footer className="bg-white border-t p-4 flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
        등록하기
        </button>
    </footer>
    </div>)
}