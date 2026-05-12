import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = "lovepages_public_route";

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
