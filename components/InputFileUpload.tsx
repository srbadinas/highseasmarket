import { ProductImageDto } from '@/types/objects/ProductImageDto';
import axios, { AxiosError } from 'axios';
import React, { ChangeEvent, Dispatch, HTMLProps, SetStateAction } from 'react'


interface InputFileUploadProps extends HTMLProps<HTMLInputElement> {
    processing?: boolean,
    setProcessing: Dispatch<SetStateAction<boolean>>,
    onValueChange: Dispatch<SetStateAction<ProductImageDto[]>>
}

const InputFileUpload = ({
    accept = "image/png, image/jpeg",
    disabled,
    processing,
    setProcessing,
    onValueChange,
    ...rest
}: InputFileUploadProps) => {

    const handleChange = async (evt: ChangeEvent<HTMLInputElement>) => {
        if (!evt.target.files) return;
        setProcessing(true);
        var formData = new FormData();
        formData.append('file', evt.target.files[0]);
        formData.append('upload_preset', 'highseasmarket');

        const imageUrl: string = await axios(`https://api.cloudinary.com/v1_1/dp4imt42j/image/upload`, {
            method: 'POST',
            data: formData,
        }).then((res) => {
            if (res.status !== 200) {
                return;
            };
            const { data } = res;
            const { secure_url } = data;
            evt.target.value = '';
            return secure_url;
        }).catch((err: AxiosError) => {
            console.error(err);
        });

        onValueChange(prev => {
            const newData = [...prev];

            newData.map(item => {
                item.is_active = false;
            });

            const productImage: ProductImageDto = {
                image_url: imageUrl,
                is_active: true,
            } as ProductImageDto;

            return [...newData, productImage];
        });
        setProcessing(false);
    };

    return (
        <input
            type="file"
            accept={accept}
            className="w-full border border-dashed border-gray-300 rounded px-3 py-4"
            disabled={disabled || processing}
            onChange={handleChange}
            {...rest}
        />
    )
}

export default InputFileUpload