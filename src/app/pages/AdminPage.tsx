import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

// ✅ TYPE DEFINITIONS
type Service = {
  id?: string;
  name: string;
  category: string;
  image: string;
};

export default function AdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState<Service>({
    name: "",
    category: "",
    image: ""
  });

  // 🔥 FETCH SERVICES
  const fetchServices = async () => {
    const snapshot = await getDocs(collection(db, "services"));
    const data: Service[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Service, "id">)
    }));
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ✅ ADD SERVICE
  const handleAdd = async () => {
    if (!form.name || !form.category) {
      alert("Fill all fields");
      return;
    }

    await addDoc(collection(db, "services"), form);

    setForm({ name: "", category: "", image: "" });
    fetchServices();
  };

  // ❌ DELETE SERVICE
  const handleDelete = async (id?: string) => {
    if (!id) return;
    await deleteDoc(doc(db, "services", id));
    fetchServices();
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      {/* ADD FORM */}
      <div className="border p-4 rounded mb-6 space-y-3">
        <input
          placeholder="Service Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Category (venue, catering...)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="border p-2 w-full"
        />

        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Service
        </button>
      </div>

      {/* LIST SERVICES */}
      <div className="grid grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s.id} className="border p-3 rounded">
            <img src={s.image} className="h-32 w-full object-cover mb-2" />
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-sm text-gray-500">{s.category}</p>

            <button
              onClick={() => handleDelete(s.id)}
              className="text-red-500 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}