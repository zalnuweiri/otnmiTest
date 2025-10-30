import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function AccountSwitcher() {
    const { usersList, loginWithExisting, user, logout } = useAuth();

    return (
        <div className="flex items-center gap-3">
            {user ? (
                <>
                    <div className="text-sm">Signed in as <b>{user.name}</b></div>
                    <button onClick={logout} className="px-2 py-1 border rounded">Logout</button>
                </>
            ) : (
                <>
                    <select
                        onChange={(e) => {
                            const val = e.target.value;
                            if (!val) return;
                            try {
                                const parsed = JSON.parse(val);
                                loginWithExisting(parsed);
                            } catch {}
                        }}
                        defaultValue=""
                        className="border rounded px-2 py-1"
                    >
                        <option value="">Quick demo: pick user</option>
                        {usersList.map(u => (
                            <option key={u.publisherKey} value={JSON.stringify(u)}>
                                {u.name} — {u.email}
                            </option>
                        ))}
                    </select>
                </>
            )}
        </div>
    );
}
