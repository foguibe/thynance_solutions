"use client";

import { useSession } from "next-auth/react";
import StartupDashboardComponent from "./startup/startupDashboard";
import SMEDashboardComponent from "./sme/smeDashboard";
import EnterpriseDashboardComponent from "./enterprise/eneterpriseDashboard";

export default function DashboardComponent() {
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
            return <StartupDashboardComponent />;
        case "sme":
            return <SMEDashboardComponent />;
        case "enterprise":
            return <EnterpriseDashboardComponent />;
        default:
            return <p>Invalid role.</p>;
    }
}
