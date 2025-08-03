import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";

export interface IconAttribute {    
    icon: IconProp;
    spin?: boolean;
    pulse?: boolean;
    bounce?: boolean;
    shake?: boolean;
    beat?: boolean;
    fade?: boolean;
    flip?: 'horizontal' | 'vertical' | 'both';
    rotation?: 90 | 180 | 270;
    size?: SizeProp;
    classes?: string;
}