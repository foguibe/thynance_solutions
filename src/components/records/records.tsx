"use client";

import { useSession } from "next-auth/react";
import StartupRecordsComponent from "./startup/startup";
import SMERecordsComponent from "./sme/sme";
import EnterpriseRecordsComponent from "./enterprise/enterprise";

export default function RecordsComponent() {
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
            return <StartupRecordsComponent />;
        case "sme":
            return <SMERecordsComponent />;
        case "enterprise":
            return <EnterpriseRecordsComponent />;
        default:
            return <p>Invalid role.</p>;
    }
}
