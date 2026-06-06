import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface DataKehadiran {
	namaKaryawan: string;
	waktuAbsen: string;
}

export default function LayarRiwayat() {
	const [riwayat, setRiwayat] = useState<DataKehadiran[]>([]);

	useFocusEffect(
		useCallback(() => {
			const ambilData = async () => {
				try {
					const jsonValue = await AsyncStorage.getItem("@data_absen");
					if (jsonValue !== null) {
						setRiwayat(JSON.parse(jsonValue));
					}
				} catch (e) {
					console.log("Gagal mengambil data: ", e);
				}
			};
			ambilData();
		}, []),
	);

	return (
		<View style={styles.wadah}>
			{/* Header */}
			<View style={styles.headerContainer}>
				<Text style={styles.judul}>Riwayat Kehadiran</Text>
				<Text style={styles.subJudul}>Rekap data absensi harian</Text>
			</View>

			<FlatList
				data={riwayat}
				keyExtractor={(item, index) => index.toString()}
				contentContainerStyle={styles.listContainer}
				renderItem={({ item }) => (
					// Sidebar: Avatar dan Teks
					<View style={styles.kiriCard}>
						<View style={styles.avatar}>
							<Ionicons name="person" size={24} color="#fff" />
						</View>
						<View style={styles.infoTeks}>
							<Text style={styles.teksNama}>{item.namaKaryawan}</Text>
							<View style={styles.waktuContainer}>
								<Ionicons name="time-outline" size={14} color="#888" />
								<Text style={styles.teksWaktu}>{item.waktuAbsen}</Text>
							</View>
						</View>

						{/* Bagian Kanan: Badge Status */}
						<View style={styles.badgeHadir}>
							<Text style={styles.teksBadge}>Hadir</Text>
						</View>
					</View>
				)}
				ListEmptyComponent={
					<View style={styles.emptyState}>
						<Ionicons name="folder-open-outline" size={48} color="#ccc" />
						<Text style={styles.emptyText}>
							Belum ada data riwayat absensi.
						</Text>
					</View>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wadah: {
		flex: 1,
		backgroundColor: "#F8F9FA", // Warna background abu-abu sangat muda khas aplikasi modern
	},
	headerContainer: {
		paddingHorizontal: 24,
		paddingTop: 40,
		paddingBottom: 20,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#E9ECEF",
	},
	judul: {
		fontSize: 24,
		fontWeight: "800",
		color: "#212529",
	},
	subJudul: {
		fontSize: 14,
		color: "#6C757D",
		marginTop: 4,
	},
	listContainer: {
		padding: 24,
	},
	kartuList: {
		backgroundColor: "#fff",
		borderRadius: 16, // Sudut yang lebih membulat
		padding: 16,
		marginBottom: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		// Efek Shadow untuk iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		// Efek Shadow untuk Android
		elevation: 3,
	},
	kiriCard: {
		flexDirection: "row",
		alignItems: "center",
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24, // Membuatnya menjadi lingkaran sempurna
		backgroundColor: "#E9ECEF",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 16,
	},
	infoTeks: {
		justifyContent: "center",
	},
	teksNama: {
		fontSize: 16,
		fontWeight: "700",
		color: "#2B2D42",
		marginBottom: 4,
	},
	waktuContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	teksWaktu: {
		fontSize: 13,
		color: "#8D99AE",
		marginLeft: 4,
	},
	badgeHadir: {
		backgroundColor: "#E3FCEF", // Hijau pastel
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
	},
	teksBadge: {
		color: "#0B6623",
		fontSize: 12,
		fontWeight: "bold",
	},
	emptyState: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 60,
	},
	emptyText: {
		marginTop: 12,
		fontSize: 14,
		color: "#888",
	},
});
