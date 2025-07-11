import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyVariantEnum,
} from "@/types";

export const HEADER_PAGE_CONFIG = {
  HEADER_TEXT: {
    typographyProps: {
      children: "Our Mission",
      variant: TypographyVariantEnum.H5,
    },
    fontWeight: TypographyFontWeight.bold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.blue1,
  },
  TITLE_TEXT: {
    typographyProps: {
      children: "Our mission is help people to find the perfect job.",
      variant: TypographyVariantEnum.H5,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.largeTitle,
    fontColor: TypographyFontColor.black2,
  },
  SUB_TITLE_TEXT: {
    typographyProps: {
      children:
        "Praesent non sem facilisis, hendrerit nisi vitae, volutpat quam. Aliquam metus mauris, semper eu eros vitae, blandit tristique metus. Vestibulum maximus nec justo sed maximus.",
      variant: TypographyVariantEnum.H6,
    },
    fontWeight: TypographyFontWeight.normal,
    fontSize: TypographyFontSize.extralarge,
    fontColor: TypographyFontColor.black3,
  },
};

export const PAGE_BODY_CONFIG = {
  BODY_TEXT_1: {
    typographyProps: {
      children:
        "We are the next generation hiring platform helping employees and recruiter teams navigate their work and productivity with us.",
      variant: TypographyVariantEnum.H5,
    },
    fontWeight: TypographyFontWeight.bold,
    fontSize: TypographyFontSize.extraTitle,
    fontColor: TypographyFontColor.black15,
  },
  BODY_TEXT_2: {
    typographyProps: {
      children:
        "We provide a platform that streamlines and expedites the job search, offering comprehensive resources, tailored recommendations, and advanced search capabilities. With Career, tech professionals can maximize their chances of finding the perfect job.",
      variant: TypographyVariantEnum.H6,
    },
    fontWeight: TypographyFontWeight.normal,
    fontSize: TypographyFontSize.extralarge,
    fontColor: TypographyFontColor.grey1,
  },
  BODY_TEXT_3: {
    typographyProps: {
      children:
        "Career's mission is to revolutionize the job search process for tech professionals by empowering them to discover their ideal job opportunity quickly and effortlessly. We provide a platform that streamlines and expedites the job search, offering comprehensive resources, tailored recommendations, and advanced search capabilities. With Career, tech professionals can maximize their chances of finding the perfect job, enabling them to accelerate their career growth and achieve professional fulfillment.",
      variant: TypographyVariantEnum.H6,
    },
    fontWeight: TypographyFontWeight.normal,
    fontSize: TypographyFontSize.extralarge,
    fontColor: TypographyFontColor.grey1,
  },
};

export const COMPANY_REVIEW_CONFIG = {
  TITLE_TEXT: {
    typographyProps: {
      children: "What our poeple says",
      variant: TypographyVariantEnum.H6,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.largeTitle,
    fontColor: TypographyFontColor.black16,
  },
  NAME_TEXT: {
    typographyProps: {
      children: "John Wick",
      variant: TypographyVariantEnum.H6,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.extralarge,
    fontColor: TypographyFontColor.black2,
  },
  JOB_TITLE_TEXT: {
    typographyProps: {
      children: "Creative Director",
      variant: TypographyVariantEnum.BODY2,
    },
    fontWeight: TypographyFontWeight.normal,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black3,
  },
  REIVEW_TEXT: {
    typographyProps: {
      children:
        "Curabitur vitae aliquam risus. Mauris quis vehicula nisl, sed commodo ipsum. Praesent semper diam ut diam elementum, ut scelerisque nibh commodo. Integer faucibus porttitor vehicula. Maecenas venenatis dictum ligula. Orci varius natoque penatibus et magnis dis parturient montes.",
      variant: TypographyVariantEnum.H6,
    },
    fontWeight: TypographyFontWeight.normal,
    fontSize: TypographyFontSize.large,
    fontColor: TypographyFontColor.black2,
  },
};

export const JOB_SEEKER_CONFIG = {
  SEEKER_TITLE_FIELD: {
    typographyProps: {
      children: "Become a Job Seeker",
      variant: TypographyVariantEnum.H6,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.extralarge,
    fontColor: TypographyFontColor.black16,
  },
  SEEKER_TEXT_FIELD: {
    typographyProps: {
      children:
        "Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi sed efficitur dolor. Pelque augue risus, aliqu.",
      variant: TypographyVariantEnum.H6,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.extralarge,
    fontColor: TypographyFontColor.black2,
  },
  SEEKER_REGISTER_BUTTON: {
    buttonProps: {
      children: "Register Now",
      variant: ButtonVariantEnum.OUTLINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
      type: "submit",
    },
  },
};
export const RECRUITER_CONFIG = {
  RECRUTITER_TITLE_FIELD: {
    typographyProps: {
      children: "Become a Recriuter",
      variant: TypographyVariantEnum.H6,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.extralarge,
    fontColor: TypographyFontColor.white,
  },
  RECRUITER_TEXT_FIELD: {
    typographyProps: {
      children:
        "Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi sed efficitur dolor. Pelque augue risus, aliqu.",
      variant: TypographyVariantEnum.H6,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.extralarge,
    fontColor: TypographyFontColor.white,
  },
  RECRUITER_REGISTER_BUTTON: {
    buttonProps: {
      children: "Register Now",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
      type: "submit",
    },
  },
};
