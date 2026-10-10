const fs = require('fs');
let code = fs.readFileSync('main-app/app/brand-subscriptions/page.tsx', 'utf-8');

code = code.replace(
  /const \[brandData, setBrandData\] = useState\({[\s\S]*?email: searchParams\.get\('email'\) \|\| ''\r?\n\s*}\);/,
  `const [brandData, setBrandData] = useState({
    brandName: searchParams.get('brand') || '',
    founderName: searchParams.get('founder') || '',
    category: searchParams.get('category') || '',
    phone: searchParams.get('phone') || '',
    email: searchParams.get('email') || '',
    logo: searchParams.get('logo') || ''
  });`
);

code = code.replace(/email: cookieData\.email \|\| ''/, `email: cookieData.email || '', logo: cookieData.logo || ''`);
code = code.replace(/category: 'D2C Brand', phone: '', email: ''/g, `category: 'D2C Brand', phone: '', email: '', logo: ''`);
code = code.replace(/const { brandName, founderName, category, phone, email } = brandData;/, `const { brandName, founderName, category, phone, email, logo } = brandData;`);

code = code.replace(
  /<div className="w-full h-full bg-slate-900 rounded-\[14px\] flex flex-col items-center justify-center text-white">[\s\S]*?<span className="text-sm font-mono font-bold tracking-widest text-pink-300">{initials}<\/span>[\s\S]*?<span className="text-\[9px\] uppercase tracking-wider text-pink-200 font-semibold">BRAND<\/span>[\s\S]*?<\/div>/,
  `<div className="w-full h-full bg-slate-900 rounded-[14px] overflow-hidden flex flex-col items-center justify-center text-white">
                {logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logo} alt={brandName} className="w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="text-sm font-mono font-bold tracking-widest text-pink-300">{initials}</span>
                    <span className="text-[9px] uppercase tracking-wider text-pink-200 font-semibold">BRAND</span>
                  </>
                )}
              </div>`
);

fs.writeFileSync('main-app/app/brand-subscriptions/page.tsx', code);
console.log('Done!');
