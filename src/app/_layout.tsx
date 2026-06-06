import { Ionicons } from "@expo/vector-icons"; // Library icon bawaan Expo
import { Tabs } from "expo-router";

export default function LayoutUtama() {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
			{/* Mengatur Tab untuk file index.tsx (Layar Absensi yang baru kamu buat) */}
			<Tabs.Screen
				name="index"
				options={{
					title: "Input Absen",
					tabBarIcon: ({ color }) => (
						<Ionicons name="document-text" size={24} color={color} />
					),
				}}
			/>
			{/* Mengatur Tab untuk halaman riwayat (yang akan kita buat nanti) */}
			<Tabs.Screen
				name="riwayat"
				options={{
					title: "Data Riwayat",
					tabBarIcon: ({ color }) => (
						<Ionicons name="list" size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
