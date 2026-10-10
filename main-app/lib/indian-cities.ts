/**
 * Cities & towns across India, grouped by state / UT.
 * The brand registration form only accepts a city from this list.
 */
const CITIES_BY_STATE: Record<string, string[]> = {
  'Andhra Pradesh': [
    'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Tirupati', 'Kakinada', 'Kadapa', 'Anantapur',
    'Eluru', 'Ongole', 'Chittoor', 'Machilipatnam', 'Srikakulam', 'Vizianagaram', 'Tenali', 'Proddatur', 'Hindupur', 'Bhimavaram',
    'Madanapalle', 'Guntakal', 'Dharmavaram', 'Gudivada', 'Narasaraopet', 'Tadepalligudem', 'Chilakaluripet', 'Amaravati', 'Nandyal', 'Adoni',
  ],
  'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang', 'Ziro', 'Bomdila', 'Along', 'Tezu'],
  'Assam': [
    'Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur', 'Bongaigaon', 'Dhubri', 'Diphu',
    'North Lakhimpur', 'Karimganj', 'Sivasagar', 'Goalpara', 'Barpeta', 'Golaghat',
  ],
  'Bihar': [
    'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Bihar Sharif', 'Arrah', 'Begusarai', 'Katihar',
    'Munger', 'Chhapra', 'Samastipur', 'Hajipur', 'Sasaram', 'Dehri', 'Siwan', 'Motihari', 'Nawada', 'Bagaha',
    'Buxar', 'Kishanganj', 'Sitamarhi', 'Jamalpur', 'Jehanabad', 'Aurangabad (Bihar)', 'Araria', 'Saharsa',
  ],
  'Chhattisgarh': [
    'Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon', 'Raigarh', 'Jagdalpur', 'Ambikapur', 'Chirmiri',
    'Dhamtari', 'Mahasamund', 'Kawardha', 'Kanker',
  ],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda', 'Bicholim', 'Curchorem', 'Canacona', 'Calangute', 'Candolim'],
  'Gujarat': [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand', 'Nadiad',
    'Morbi', 'Mehsana', 'Bharuch', 'Vapi', 'Navsari', 'Veraval', 'Porbandar', 'Godhra', 'Bhuj', 'Palanpur',
    'Valsad', 'Surendranagar', 'Gandhidham', 'Amreli', 'Patan', 'Ankleshwar', 'Botad', 'Dahod', 'Kalol', 'Modasa',
    'Himmatnagar', 'Mundra', 'Sanand', 'Dwarka', 'Wadhwan', 'Palitana', 'Dholka', 'Visnagar', 'Unjha', 'Deesa',
  ],
  'Haryana': [
    'Faridabad', 'Gurugram', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar', 'Karnal', 'Sonipat', 'Panchkula',
    'Bhiwani', 'Sirsa', 'Bahadurgarh', 'Jind', 'Thanesar', 'Kaithal', 'Rewari', 'Palwal', 'Hansi', 'Narnaul',
    'Fatehabad', 'Gohana', 'Tohana', 'Mahendragarh', 'Charkhi Dadri', 'Manesar', 'Pinjore',
  ],
  'Himachal Pradesh': [
    'Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Baddi', 'Palampur', 'Kullu', 'Manali', 'Nahan', 'Una',
    'Hamirpur (HP)', 'Bilaspur (HP)', 'Chamba', 'Kangra', 'Sundernagar', 'Parwanoo', 'Nurpur', 'Paonta Sahib',
  ],
  'Jharkhand': [
    'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro Steel City', 'Deoghar', 'Phusro', 'Hazaribagh', 'Giridih', 'Ramgarh', 'Medininagar',
    'Chirkunda', 'Chaibasa', 'Dumka', 'Sahibganj', 'Lohardaga', 'Gumla', 'Pakur', 'Godda',
  ],
  'Karnataka': [
    'Bengaluru', 'Mysuru', 'Hubballi', 'Dharwad', 'Mangaluru', 'Belagavi', 'Kalaburagi', 'Davanagere', 'Ballari', 'Vijayapura',
    'Shivamogga', 'Tumakuru', 'Raichur', 'Bidar', 'Hospet', 'Hassan', 'Gadag', 'Udupi', 'Robertsonpet', 'Bhadravati',
    'Chitradurga', 'Kolar', 'Mandya', 'Chikkamagaluru', 'Gangavati', 'Bagalkot', 'Ranebennuru', 'Karwar', 'Ramanagara', 'Chikkaballapur',
    'Yadgir', 'Madikeri', 'Sirsi', 'Puttur', 'Mudhol', 'Bhatkal', 'Chamarajanagar', 'Whitefield', 'Yelahanka', 'Electronic City',
  ],
  'Kerala': [
    'Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Alappuzha', 'Palakkad', 'Kannur', 'Kottayam', 'Malappuram',
    'Manjeri', 'Thalassery', 'Ponnani', 'Vatakara', 'Kanhangad', 'Payyannur', 'Koyilandy', 'Kayamkulam', 'Neyyattinkara', 'Attingal',
    'Nedumangad', 'Changanassery', 'Perinthalmanna', 'Taliparamba', 'Kasaragod', 'Pathanamthitta', 'Idukki', 'Wayanad', 'Muvattupuzha', 'Aluva',
    'Irinjalakuda', 'Guruvayur', 'Cherthala', 'Varkala', 'Kunnamkulam', 'Tirur', 'Kattappana', 'Munnar',
  ],
  'Madhya Pradesh': [
    'Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa',
    'Murwara (Katni)', 'Singrauli', 'Burhanpur', 'Khandwa', 'Bhind', 'Chhindwara', 'Guna', 'Shivpuri', 'Vidisha', 'Chhatarpur',
    'Damoh', 'Mandsaur', 'Khargone', 'Neemuch', 'Pithampur', 'Hoshangabad', 'Itarsi', 'Sehore', 'Betul', 'Seoni',
    'Datia', 'Nagda', 'Morena', 'Dhar', 'Balaghat', 'Shahdol', 'Panna', 'Mhow', 'Narmadapuram', 'Raisen',
  ],
  'Maharashtra': [
    'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad (Chhatrapati Sambhajinagar)', 'Solapur', 'Navi Mumbai', 'Kolhapur', 'Amravati',
    'Pimpri-Chinchwad', 'Kalyan-Dombivli', 'Vasai-Virar', 'Mira-Bhayandar', 'Bhiwandi', 'Sangli', 'Malegaon', 'Jalgaon', 'Akola', 'Latur',
    'Dhule', 'Ahmednagar', 'Chandrapur', 'Parbhani', 'Ichalkaranji', 'Jalna', 'Ambarnath', 'Bhusawal', 'Panvel', 'Badlapur',
    'Beed', 'Gondia', 'Satara', 'Barshi', 'Yavatmal', 'Achalpur', 'Osmanabad (Dharashiv)', 'Nanded', 'Wardha', 'Udgir',
    'Hinganghat', 'Ulhasnagar', 'Ratnagiri', 'Sindhudurg', 'Alibag', 'Lonavala', 'Mahabaleshwar', 'Shirdi', 'Baramati', 'Karad',
    'Khopoli', 'Pandharpur', 'Miraj', 'Kamptee', 'Washim', 'Hingoli', 'Bhandara', 'Gadchiroli', 'Nandurbar', 'Wai',
  ],
  'Manipur': ['Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur', 'Kakching', 'Ukhrul', 'Senapati', 'Tamenglong'],
  'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongstoin', 'Baghmara', 'Williamnagar', 'Mairang', 'Cherrapunji'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip', 'Kolasib', 'Saiha', 'Lawngtlai', 'Mamit'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto', 'Mon', 'Phek'],
  'Odisha': [
    'Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri', 'Balasore', 'Bhadrak', 'Baripada', 'Jharsuguda',
    'Jeypore', 'Bargarh', 'Rayagada', 'Balangir', 'Angul', 'Dhenkanal', 'Kendujhar', 'Paradip', 'Koraput', 'Talcher',
    'Brahmapur', 'Sundargarh', 'Jajpur', 'Kendrapara', 'Nabarangpur', 'Phulbani',
  ],
  'Punjab': [
    'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali (SAS Nagar)', 'Pathankot', 'Hoshiarpur', 'Batala', 'Moga',
    'Abohar', 'Malerkotla', 'Khanna', 'Phagwara', 'Muktsar', 'Barnala', 'Firozpur', 'Kapurthala', 'Zirakpur', 'Rajpura',
    'Sangrur', 'Faridkot', 'Fazilka', 'Gurdaspur', 'Mansa', 'Nabha', 'Rupnagar', 'Tarn Taran', 'Dera Bassi', 'Kharar',
  ],
  'Rajasthan': [
    'Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Bhilwara', 'Alwar', 'Sikar', 'Bharatpur',
    'Pali', 'Sri Ganganagar', 'Hanumangarh', 'Beawar', 'Kishangarh', 'Tonk', 'Churu', 'Jhunjhunu', 'Barmer', 'Chittorgarh',
    'Sawai Madhopur', 'Dausa', 'Nagaur', 'Jaisalmer', 'Banswara', 'Dungarpur', 'Bundi', 'Baran', 'Jhalawar', 'Karauli',
    'Hindaun', 'Sirohi', 'Pratapgarh (Rajasthan)', 'Rajsamand', 'Mount Abu', 'Pushkar', 'Neemrana', 'Bhiwadi', 'Dholpur', 'Fatehpur',
  ],
  'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan', 'Rangpo', 'Jorethang', 'Singtam', 'Pelling'],
  'Tamil Nadu': [
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Erode', 'Vellore', 'Thoothukudi',
    'Dindigul', 'Thanjavur', 'Ranipet', 'Sivakasi', 'Karur', 'Udhagamandalam (Ooty)', 'Hosur', 'Nagercoil', 'Kanchipuram', 'Kumbakonam',
    'Rajapalayam', 'Pudukkottai', 'Neyveli', 'Nagapattinam', 'Viluppuram', 'Tiruvannamalai', 'Cuddalore', 'Karaikudi', 'Namakkal', 'Pollachi',
    'Krishnagiri', 'Dharmapuri', 'Theni', 'Ambur', 'Pattukkottai', 'Mayiladuthurai', 'Kovilpatti', 'Tenkasi', 'Virudhunagar', 'Ramanathapuram',
    'Perambalur', 'Ariyalur', 'Arakkonam', 'Tambaram', 'Avadi', 'Kodaikanal', 'Coonoor', 'Mettupalayam', 'Gobichettipalayam', 'Palani',
  ],
  'Telangana': [
    'Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Ramagundam', 'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Suryapet',
    'Siddipet', 'Miryalaguda', 'Jagtial', 'Mancherial', 'Nirmal', 'Kamareddy', 'Kothagudem', 'Bodhan', 'Sangareddy', 'Secunderabad',
    'Medak', 'Vikarabad', 'Wanaparthy', 'Zaheerabad', 'Bhongir', 'Gajwel',
  ],
  'Tripura': ['Agartala', 'Udaipur (Tripura)', 'Dharmanagar', 'Ambassa', 'Kailasahar', 'Belonia', 'Khowai', 'Teliamura'],
  'Uttar Pradesh': [
    'Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Prayagraj', 'Bareilly', 'Aligarh', 'Moradabad',
    'Saharanpur', 'Gorakhpur', 'Noida', 'Greater Noida', 'Firozabad', 'Jhansi', 'Muzaffarnagar', 'Mathura', 'Vrindavan', 'Budaun',
    'Rampur', 'Shahjahanpur', 'Farrukhabad', 'Ayodhya', 'Maunath Bhanjan', 'Hapur', 'Etawah', 'Mirzapur', 'Bulandshahr', 'Sambhal',
    'Amroha', 'Hardoi', 'Fatehpur', 'Raebareli', 'Orai', 'Sitapur', 'Bahraich', 'Modinagar', 'Unnao', 'Jaunpur',
    'Lakhimpur', 'Hathras', 'Banda', 'Pilibhit', 'Barabanki', 'Mainpuri', 'Etah', 'Azamgarh', 'Sultanpur', 'Deoria',
    'Basti', 'Ballia', 'Gonda', 'Lalitpur', 'Ghazipur', 'Chandausi', 'Kasganj', 'Mughalsarai', 'Bijnor', 'Muradnagar',
    'Roorkee Road', 'Kushinagar', 'Chitrakoot', 'Naini', 'Faizabad',
  ],
  'Uttarakhand': [
    'Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Kashipur', 'Rishikesh', 'Pithoragarh', 'Ramnagar', 'Mussoorie',
    'Nainital', 'Almora', 'Kotdwar', 'Tehri', 'Pauri', 'Bageshwar', 'Champawat', 'Uttarkashi', 'Sitarganj', 'Jaspur',
  ],
  'West Bengal': [
    'Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman', 'Malda', 'Baharampur', 'Habra', 'Kharagpur',
    'Shantipur', 'Dankuni', 'Dhulian', 'Ranaghat', 'Haldia', 'Raiganj', 'Krishnanagar', 'Nabadwip', 'Midnapore', 'Balurghat',
    'Basirhat', 'Bankura', 'Chandannagar', 'Darjeeling', 'Alipurduar', 'Purulia', 'Jangipur', 'Bangaon', 'Cooch Behar', 'Jalpaiguri',
    'Barasat', 'Bidhannagar (Salt Lake)', 'Kalyani', 'Barrackpore', 'Serampore', 'Kalimpong', 'Digha', 'Bishnupur', 'Tamluk', 'Contai',
  ],

  /* ─── Union Territories ─── */
  'Andaman & Nicobar Islands': ['Port Blair', 'Diglipur', 'Mayabunder', 'Rangat', 'Havelock Island (Swaraj Dweep)', 'Car Nicobar'],
  'Chandigarh': ['Chandigarh'],
  'Dadra & Nagar Haveli and Daman & Diu': ['Daman', 'Diu', 'Silvassa', 'Amli'],
  'Delhi': [
    'New Delhi', 'Delhi', 'Dwarka', 'Rohini', 'Saket', 'Karol Bagh', 'Connaught Place', 'Lajpat Nagar', 'Janakpuri', 'Pitampura',
    'Laxmi Nagar', 'Najafgarh', 'Narela', 'Vasant Kunj', 'Mayur Vihar', 'Preet Vihar', 'Chandni Chowk', 'Okhla',
  ],
  'Jammu & Kashmir': [
    'Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Sopore', 'Kathua', 'Udhampur', 'Punch', 'Rajouri', 'Kupwara',
    'Budgam', 'Pulwama', 'Bandipora', 'Ganderbal', 'Kulgam', 'Samba', 'Doda', 'Ramban', 'Gulmarg', 'Pahalgam',
  ],
  'Ladakh': ['Leh', 'Kargil', 'Nubra', 'Diskit', 'Zanskar', 'Drass'],
  'Lakshadweep': ['Kavaratti', 'Agatti', 'Minicoy', 'Amini', 'Andrott', 'Kalpeni'],
  'Puducherry': ['Puducherry', 'Karaikal', 'Yanam', 'Mahe', 'Ozhukarai', 'Villianur', 'Auroville'],
};

export type IndianCity = { name: string; state: string; label: string };

export const INDIAN_CITIES: IndianCity[] = Object.entries(CITIES_BY_STATE)
  .flatMap(([state, cities]) => cities.map((name) => ({ name, state, label: `${name}, ${state}` })))
  .sort((a, b) => a.name.localeCompare(b.name));

const LABEL_SET = new Set(INDIAN_CITIES.map((c) => c.label));

export function isValidIndianCity(label: string): boolean {
  return LABEL_SET.has(label);
}
