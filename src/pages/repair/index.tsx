import { useCallback, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { Button, TextArea, Uploader } from "@nutui/nutui-react-taro";

import "./index.less";

// 定义上传文件项的类型（用于约束和提示）
type UploaderFileItem = {
  url?: string;
  path?: string;
  name?: string;
  thumbTempFilePath?: string;
  tempFilePath?: string;
  [key: string]: any;
};

// 声明一个函数式组件：报修页面
const RepairPage = () => {
  const [files, setFiles] = useState<UploaderFileItem[]>([]);
  const [description, setDescription] = useState("");

  const handleUpload = useCallback(async (file: any) => {
    const tempPath = file?.tempFilePath || file?.path || "";
    const displayUrl = file?.thumbTempFilePath || tempPath;

    return {
      url: displayUrl,
      path: tempPath,
      name: file?.name || tempPath?.split("/").pop() || "equipment",
    };
  }, []);

  const handleUploadChange = (items: UploaderFileItem[]) => {
    setFiles(items);
  };

  // 提交按钮点击处理
  const handleSubmit = () => {
    if (!files.length || !description.trim()) { // 校验必填：至少 1 张图片 且 描述非空
      Taro.showToast({
        title: "请完善图片信息或文字描述",
        icon: "none",
      });
      return;
    }
    // 模拟提交成功的反馈
    Taro.showToast({
      title: "提交成功",
      icon: "success",
    });
  };

  return (
    <View className="repair-page bg-black-4 px-[32rpx] py-[48rpx]">
      <View className="repair-card rounded-[32rpx] bg-white px-[32rpx] pb-[64rpx] pt-[56rpx]">
        {/*第一块：图片上传区域*/}
        <View className="mb-[56rpx]">
          <Text className="text-[28rpx] font-medium text-black-1">
            <Text className="text-red-1 mr-[8rpx]">*</Text>
            请上传健身器材照片：
          </Text>
          <View className="repair-uploader mt-[32rpx] flex">
            <Uploader
              className="mr-[24rpx]"              // 组件右侧外边距（与其他元素拉开距离）
              previewType="picture"               // 预览风格：图片
              maxCount={3}                        // 限制最多上传 3 张
              accept="image/*"                    // 仅允许选择图片
              autoUpload                          // 选择后自动触发 upload 回调（NutUI 行为）
              upload={handleUpload}               // 自定义上传处理逻辑（返回标准文件对象）
              onChange={handleUploadChange}       // 文件列表变化时同步状态
            />
          </View>
        </View>
        {/* 第二块：问题描述文本域 */}
        <View>
          {/* 上传组件所在的行容器，顶部外边距 + 横向布局 */}
          <Text className="text-[28rpx] font-medium text-black-1">
            <Text className="text-red-1 mr-[8rpx]">*</Text>
            问题描述：
          </Text>
          <TextArea
            className="mt-[24rpx] nut-textarea__textarea w-full rounded-[16rpx] bg-black-4 px-[24rpx] py-[44rpx] text-[24rpx] text-black-1"
            placeholder="请输入器械出现问题"
            value={description}
            onChange={setDescription}
            maxLength={200}
            rows={3}
          />
        </View>
        <Button         
          block                     // 按钮宽度占满容器
          shape="round"             // 圆角按钮
          className="mt-[72rpx] h-[96rpx] bg-yellow-1 text-[32rpx] font-semibold text-black-1"
          onClick={handleSubmit}    // 点击触发提交校验与反馈
        >
          提交
        </Button>
      </View>
    </View>
  );
};

export default RepairPage;
