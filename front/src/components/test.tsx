import { useForm } from "react-hook-form";
import ImageUpload from "./feedGenerate/ImageUpload";


interface CompoType {
    image: JSX.Element
}

export default function Test(){
    const {
        register,
        handleSubmit,
        watch
    } = useForm<CompoType>();

    const onValid = (image : CompoType) => {
        console.log(image)
    }
    return (
        <div>
            <h1>테스트입니다</h1>
            <form action="" encType="multipart/form-data" onSubmit={handleSubmit(onValid)}>
                <ImageUpload register={register} watch={watch}/>
                <button type="submit">제출하기</button>
            </form>
        </div>
    )
}