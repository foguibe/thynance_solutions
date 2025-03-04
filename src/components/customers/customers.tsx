"use client";

import { useSession } from "next-auth/react";
import StartupCustomersComponent from "./startup/startup";
import SMECustomersComponent from "./sme/sme";
import EnterpriseCustomersComponent from "./enterprise/enterprise";

export default function CustomerComponent() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session || !session.user) {
        return <p>Unauthorized. Please log in.</p>;
    }

    const role = session.user.role;

    switch (role) {
        case "startup":
            return <StartupCustomersComponent />;
        case "sme":
            return <SMECustomersComponent />;
        case "enterprise":
            return <EnterpriseCustomersComponent />;
        default:
            return <p>Invalid role.</p>;
    }
}
