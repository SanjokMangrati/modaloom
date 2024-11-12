import { Form } from '@/components/common/Form';
import SelectField from '@/components/common/SelectField';
import { Button } from '@/components/ui/button';
import { FormItem } from '@/components/ui/form';
import { updateAvatar } from '@/lib/api';
import { AVAILABLE_AVATAR_PROPERTIES_DEFAULT_DATA, AvailableAvatarProperties, Avatar } from '@/types/avatar.types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IAvatarEditorProps {
    avatarConfig: Avatar;
    setAvatarConfig: React.Dispatch<React.SetStateAction<Avatar>>;
}

interface IAvatarEditFormSchema {
    backgroundColor: string;
    eyebrows: string;
    eyes: string;
    hair: string;
    hairColor: string;
    mouth: string;
    skinColor: string;
}

const AvatarEditor = ({ avatarConfig, setAvatarConfig }: IAvatarEditorProps) => {
    const [avatarProperties, setAvatarProperties] = useState<AvailableAvatarProperties>(AVAILABLE_AVATAR_PROPERTIES_DEFAULT_DATA);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        import('@/app/data/avatarProperties.json').then((data) => {
            setAvatarProperties(data);
        });
    }, []);

    const methods = useForm<IAvatarEditFormSchema>({
        defaultValues: {
            backgroundColor: avatarConfig.options.backgroundColor[0],
            eyebrows: avatarConfig.options.eyebrows[0],
            eyes: avatarConfig.options.eyes[0],
            hair: avatarConfig.options.hair[0],
            hairColor: avatarConfig.options.hairColor[0],
            mouth: avatarConfig.options.mouth[0],
            skinColor: avatarConfig.options.skinColor[0],
        },
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const { handleSubmit, control } = methods;

    const handleChange = (values: IAvatarEditFormSchema) => {
        const newOptions = {
            backgroundColor: [values.backgroundColor],
            eyebrows: [values.eyebrows],
            eyes: [values.eyes],
            hair: [values.hair],
            hairColor: [values.hairColor],
            mouth: [values.mouth],
            skinColor: [values.skinColor],
        };

        setAvatarConfig((prevConfig) => ({
            ...prevConfig,
            options: newOptions,
        }));
    };

    const onSubmit: SubmitHandler<IAvatarEditFormSchema> = async (values) => {
        const newOptions = {
            backgroundColor: [values.backgroundColor],
            eyebrows: [values.eyebrows],
            eyes: [values.eyes],
            hair: [values.hair],
            hairColor: [values.hairColor],
            mouth: [values.mouth],
            skinColor: [values.skinColor],
        };
        setLoading(true);

        try {
            const result = await updateAvatar({ ...avatarConfig, options: newOptions });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            router.push('/home');
        }
    };

    return (
        <div className='flex items-center'>
            <Form
                className='flex flex-col gap-4 rounded-md'
                methods={methods}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='flex gap-6 items-center'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-medium'>Background Color</p>
                        <FormItem>
                            <SelectField
                                placeholder='Background Color'
                                options={avatarProperties.properties.backgroundColor}
                                control={control}
                                name='backgroundColor'
                                onChange={(value) => handleChange({ ...methods.getValues(), backgroundColor: value })}
                            />
                        </FormItem>
                    </div>

                </div>

                <div className='flex gap-6 items-center'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-medium'>Hair</p>
                        <FormItem>
                            <SelectField
                                placeholder='Hair'
                                options={avatarProperties.properties.hair}
                                control={control}
                                name='hair'
                                onChange={(value) => handleChange({ ...methods.getValues(), hair: value })}
                            />
                        </FormItem>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-medium'>Hair Color</p>
                        <FormItem>
                            <SelectField
                                placeholder='Hair Color'
                                options={avatarProperties.properties.hairColor}
                                control={control}
                                name='hairColor'
                                onChange={(value) => handleChange({ ...methods.getValues(), hairColor: value })}
                            />
                        </FormItem>
                    </div>
                </div>

                <div className='flex gap-6 items-center'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-medium'>Eyes</p>
                        <FormItem>
                            <SelectField
                                placeholder='Eyes'
                                options={avatarProperties.properties.eyes}
                                control={control}
                                name='eyes'
                                onChange={(value) => handleChange({ ...methods.getValues(), eyes: value })}
                            />
                        </FormItem>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-medium'>Eyebrows</p>
                        <FormItem>
                            <SelectField
                                placeholder='Eyebrows'
                                options={avatarProperties.properties.eyebrows}
                                control={control}
                                name='eyebrows'
                                onChange={(value) => handleChange({ ...methods.getValues(), eyebrows: value })}
                            />
                        </FormItem>
                    </div>
                </div>

                <div className='flex gap-6 items-center'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-medium'>Mouth</p>
                        <FormItem>
                            <SelectField
                                placeholder='Mouth'
                                options={avatarProperties.properties.mouth}
                                control={control}
                                name='mouth'
                                onChange={(value) => handleChange({ ...methods.getValues(), mouth: value })}
                            />
                        </FormItem>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-medium'>Skin Color</p>
                        <FormItem>
                            <SelectField
                                placeholder='Skin Color'
                                options={avatarProperties.properties.skinColor}
                                control={control}
                                name='skinColor'
                                onChange={(value) => handleChange({ ...methods.getValues(), skinColor: value })}
                            />
                        </FormItem>
                    </div>
                </div>

                <Button className='hover:bg-accent-hover'>Save</Button>
            </Form>
        </div>
    );
};

export default AvatarEditor;
