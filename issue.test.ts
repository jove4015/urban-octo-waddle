import type { NextApiRequest, NextApiResponse } from "next";
import {
  User as ClerkUser,
  Organization as ClerkOrganization,
  OrganizationMembership as ClerkOrganizationMembership,
} from "@clerk/nextjs/dist/api"
import * as trpc from "@trpc/server";
import { clerkClient } from "@clerk/nextjs/server";


export type Context = {
  req: NextApiRequest;
  res: NextApiResponse<any>;
  splitLink: boolean;
};

export function createRouter() {
  return trpc.router<Context>();
}

export const adminRouter = createRouter().mutation("clerk.resync", {
  async resolve({ ctx }) {
    const numUsers = await clerkClient.users.getCount({});
    return true;
  },
});


const orgMember: ClerkOrganizationMembership = {
  id: "123",
  organization: {
    id: "123",
    name: "name",
    slug: "slug",
    createdBy: "james",
    createdAt: 123,
    updatedAt: 123,
    publicMetadata: {},
    privateMetadata: {},
    logoUrl: "https://example.com",
  },
  privateMetadata: {},
  publicMetadata: {},
  publicUserData: null,
  role: "admin",
  createdAt: 123,
  updatedAt: 123,
}

const organization: ClerkOrganization = {
  id: "123",
  name: "name",
  slug: "slug",
  createdBy: "james",
  logoUrl: "https://example.com",
  createdAt: 123,
  updatedAt: 123,
  publicMetadata: {},
  privateMetadata: {},
}

const user: ClerkUser = {
  id: "123",
  passwordEnabled: true,
  totpEnabled: true,
  backupCodeEnabled: true,
  twoFactorEnabled: true,
  banned: false,
  createdAt: 123,
  updatedAt: 123,
  profileImageUrl: "https://example.com",
  gender: "Male",
  birthday: "1990-01-01",
  primaryEmailAddressId: "123",
  primaryPhoneNumberId: "123",
  primaryWeb3WalletId: "123",
  lastSignInAt: 123,
  externalId: "123",
  username: "username",
  firstName: "first",
  lastName: "last",
  publicMetadata: {},
  privateMetadata: {},
  unsafeMetadata: {},
  emailAddresses: [],
  phoneNumbers: [],
  web3Wallets: [],
  externalAccounts: [],

}


test('expect fake user to have email', () => {
  expect(user.firstName).toBe("first");
});

test('expect org to have slug named slug', () => {
  expect(organization.slug).toBe("slug");
});

test('expect orgMember to have id', () => {
  expect(orgMember.id).toBe("123");
});
