import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

interface DataKehadiran {
	namaKaryawan: string;
	waktuAbsen: string;
}

export default function LayarAbsensi() {
	const [nama, setNama] = useState<string>("");
	const [daftarHadir, setDaftarHadir] = useState<DataKehadiran[]>([]);

	useEffect(() => {
		const muatData = async () => {
			try {
				const dataTersimpan = await AsyncStorage.getItem("@data_absen");
				if (dataTersimpan !== null) {
					setDaftarHadir(JSON.parse(dataTersimpan));
				}
			} catch (e) {
				console.log("Gagal memuat data: ", e);
			}
		};
		muatData();
	}, []);

	const tanganiKehadiran = async () => {
		if (nama.trim() !== "") {
			const waktuSekarang = new Date().toLocaleTimeString("id-ID", {
				hour: "2-digit",
				minute: "2-digit",
			});

			const dataBaru = {
				namaKaryawan: nama,
				waktuAbsen: waktuSekarang,
			};
			const daftarTerbaru = [dataBaru, ...daftarHadir];
			setDaftarHadir(daftarTerbaru);
			setNama("");

			try {
				const jsonValue = JSON.stringify(daftarTerbaru);
				await AsyncStorage.setItem("@data_absen", jsonValue);
			} catch (e) {
				console.log("Gagal menyimpan data: ", e);
			}
		}
	};

	return (
		<View style={styles.wadah}>
			<Text style={styles.judul}>Absensi Harian</Text>

			<TextInput
				style={styles.input}
				placeholder="Ketik nama karyawan..."
				value={nama}
				onChangeText={setNama}
			/>

			<TouchableOpacity style={styles.tombol} onPress={tanganiKehadiran}>
				<Text style={styles.teksTombol}>Catat Kehadiran</Text>
			</TouchableOpacity>

			<FlatList
				data={daftarHadir}
				keyExtractor={(item: any, index: { toString: () => any }) =>
					index.toString()
				}
				renderItem={({ item }) => (
					<View style={styles.kartuList}>
						<Text style={styles.teksList}>
							✅ {item.namaKaryawan} telah hadir pada {item.waktuAbsen}
						</Text>
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wadah: {
		flex: 1,
		padding: 24,
		backgroundColor: "#f5f5f5",
		marginTop: 40,
	},
	judul: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		backgroundColor: "#fff",
		padding: 12,
		borderRadius: 8,
		marginBottom: 16,
	},
	tombol: {
		backgroundColor: "#007BFF",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 24,
	},
	teksTombol: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
	kartuList: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 8,
		marginBottom: 12,
		borderLeftWidth: 4,
		borderLeftColor: "#28a745",
	},
	teksList: {
		fontSize: 16,
	},
});
