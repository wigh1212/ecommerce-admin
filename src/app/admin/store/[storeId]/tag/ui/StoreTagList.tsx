"use client";

import React, { useState } from "react";
import { StoreTagProps } from "../model/storeTagTypes";

export default function StoreTagList({
  items,
  createAction,
  deleteAction,
}: StoreTagProps) {
  
  const handleChange = (id: number, checked: boolean) => {
    if (checked) {
      const payload = { tagId: id };
      createAction?.(payload);
    } else {
      deleteAction?.(id);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 p-4 bg-white rounded-lg shadow">
      {items.map((tag) => (
        <label
          key={tag.id}
          className="flex items-center space-x-3 border rounded-lg px-3 py-2 hover:bg-gray-50 transition cursor-pointer"
        >
          <input
            type="checkbox"
            checked={tag.exists}
            onChange={(e) => handleChange(tag.id, e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-800 text-sm">{tag.name}</span>
        </label>
      ))}

      {items.length === 0 && (
        <div className="col-span-2 text-center text-gray-400 py-4">
          등록된 태그가 없습니다.
        </div>
      )}
    </div>
  );
}