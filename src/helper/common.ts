import {
  ADDRESS_KEY_CONFIG,
  DOCUMENT_MAX_FILE_SIZE,
  DOUCMENT_TITLE_CONFIG,
  HIDE_SIDEBAR_AUTHENTICATED_CONFIG,
  LOCAL_STORAGE_KEY,
  NON_PRIVATE_PUBLIC_ROUTES_CONFIG,
  NOTIFICATION_DOUCMENT_TITLE_CONFIG,
  PRIVATE_PUBLIC_ROUTES_CONFIG,
  PRIVATE_ROUTE_USER_TYPE_CONFIG,
  PRIVATE_ROUTES_CONFIG,
  RECRUITER_PROFILE_SIDEBAR_CONFIG,
  SHOW_SIDEBAR_NON_AUTHENTICATED_CONFIG,
  STUDENT_PROFILE_SIDEBAR_CONFIG,
  TOP_RIBBON_CONFIG_FOR_NON_AUTHENTICATED_USER,
  TOP_RIBBON_CONFIG_JOB_SEEKER,
  TOP_RIBBON_CONFIG_RECRUITER,
} from "@/constants";
import {
  AddressType,
  CommonAllDataType,
  FormikFormProps,
  JobSeekerDocumentKeyEnum,
  RecruiterDocumentKeyEnum,
  ThemeType,
  UserType,
} from "@/types";
import { getItem } from "./cookieStorage";

export function constructClassName(classNames: string[]): string {
  return Array.from(new Set(classNames))
    .filter((className) => className && className !== "")
    .join(" ");
}

export function isUserAuthenticated(): boolean {
  const accessToken = getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  return accessToken !== "";
}

export function isUserAuthenticatedWithServer(
  accessTokenFromServer: string
): boolean {
  return accessTokenFromServer !== "" || isUserAuthenticated();
}

export function isPrivateRoute(routePath: string): boolean {
  return PRIVATE_ROUTES_CONFIG.includes(routePath);
}

export function isNonPrivateRoute(routePath: string): boolean {
  return NON_PRIVATE_PUBLIC_ROUTES_CONFIG.includes(routePath);
}

export function isPrivateAndPublicRoute(routePath: string): boolean {
  return PRIVATE_PUBLIC_ROUTES_CONFIG.includes(routePath);
}

export function isRouteAuthenticated(routePath: string): boolean {
  if (isUserAuthenticated()) {
    const isRoutePrivate = isPrivateRoute(routePath);
    if (!isRoutePrivate) {
      return isPrivateAndPublicRoute(routePath);
    }
    return isRoutePrivate;
  } else {
    return false;
  }
}

export function checkIfRouteAllowedForCurrentUserType({
  routePath,
  currentUserType,
}: {
  routePath: string;
  currentUserType: typeof UserType;
}): boolean {
  return PRIVATE_ROUTE_USER_TYPE_CONFIG?.[routePath]?.includes(
    Number(currentUserType)
  );
}

export function isSidebarVisible(
  routePath: string,
  isAuthenticated: boolean
): boolean {
  if (isAuthenticated) {
    return !HIDE_SIDEBAR_AUTHENTICATED_CONFIG.includes(routePath);
  } else {
    return SHOW_SIDEBAR_NON_AUTHENTICATED_CONFIG.includes(routePath);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getAddressFromData(data: any): AddressType {
  const address = ADDRESS_KEY_CONFIG?.map((key) => data?.[key])
    ?.filter((data) => data)
    ?.join(", ");

  return {
    city: data?.address || "",
    address,
  };
}

export function getCurrentTheme(isDark: boolean): ThemeType {
  return isDark ? ThemeType.DARK : ThemeType.LIGHT;
}

export function getErrorConfig(
  errors: FormikFormProps["errors"],
  fieldName: string = ""
) {
  const generatedFieldName = fieldName?.split(".") || [];
  let errorMessage = "";
  if (generatedFieldName.length > 1) {
    // Array Field Name
    const errorFieldName = generatedFieldName[2];

    if (errors?.[errorFieldName]) {
      errorMessage = (errors?.[errorFieldName] as string) || "";
    } else {
      errorMessage = (errors?.[generatedFieldName[0]] as string) || "";
    }
  } else {
    errorMessage = (errors?.[generatedFieldName[0]] as string) || "";
  }

  return {
    error: errorMessage !== "",
    helperText: errorMessage,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getErrorMessageFromAPI(error: any): {
  message: string;
} {
  const isString = typeof error?.response?.data?.message === "string";
  return {
    message: isString
      ? error?.response?.data?.message || "Internal Server Error"
      : "Internal Server Error",
  };
}

export function isLoggedInUserJobSeeker({ userType }: { userType: UserType }) {
  return userType === UserType.JOB_SEEKER_TYPE;
}

export function isLoggedInUserRecruiter({ userType }: { userType: UserType }) {
  return userType === UserType.RECUITER_TYPE;
}

export function checkIfNumberValueExistElseReturnUndefined(
  value: CommonAllDataType
) {
  return value == undefined ? "" : Number(value);
}

export function getSidebarDetails({ userType }: { userType: UserType }) {
  const isJobSeeker = isLoggedInUserJobSeeker({ userType });
  return isJobSeeker
    ? STUDENT_PROFILE_SIDEBAR_CONFIG
    : RECRUITER_PROFILE_SIDEBAR_CONFIG;
}

export function getPluralForm({
  totalLength,
}: {
  totalLength: number;
}): string {
  return totalLength > 1 ? "s" : "";
}

export function getInitials({ name }: { name: string }): string {
  if (!name) return "";

  return name
    .split(" ") // Split the name into words
    .map((word: string) => word.charAt(0).toUpperCase()) // Extract first character and capitalize
    .join(""); // Join the initials together
}

export function isLocalHost(): boolean {
  return process.env.NODE_ENV === "development";
}

export function getTopRibbonDetails({ userType }: { userType: UserType | -1 }) {
  if (userType === -1) return TOP_RIBBON_CONFIG_FOR_NON_AUTHENTICATED_USER;
  const isJobSeeker = isLoggedInUserJobSeeker({ userType });
  return isJobSeeker
    ? TOP_RIBBON_CONFIG_JOB_SEEKER
    : TOP_RIBBON_CONFIG_RECRUITER;
}

export const formatAddress = (
  keys: string[],
  obj: Record<string, []>
): string => {
  return keys
    .map((key) => obj[key]?.toString())
    .filter((value) => value)
    .join(", ");
};

export function getDocumentName(
  documentKey: JobSeekerDocumentKeyEnum | RecruiterDocumentKeyEnum
) {
  return DOUCMENT_TITLE_CONFIG?.[documentKey];
}

export function getDocumentNameForNotification(
  documentKey: JobSeekerDocumentKeyEnum | RecruiterDocumentKeyEnum
) {
  return NOTIFICATION_DOUCMENT_TITLE_CONFIG?.[documentKey];
}

export function isUploadedDocumentValidSize(fileSize: number) {
  return fileSize < DOCUMENT_MAX_FILE_SIZE;
}
