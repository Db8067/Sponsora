import os, re
pages = ['creators-setup','creator-dashboard','creators-program','creators-voucher','learner-program','learner-onboard','chat-with-brand','brand-marketplace','creators']
simple = {
 'for':'htmlFor','charset':'charSet','frameborder':'frameBorder','allowfullscreen':'allowFullScreen',
 'srcset':'srcSet','autocomplete':'autoComplete','crossorigin':'crossOrigin','novalidate':'noValidate',
 'enctype':'encType','datetime':'dateTime','spellcheck':'spellCheck','contenteditable':'contentEditable',
 'cellpadding':'cellPadding','cellspacing':'cellSpacing','viewbox':'viewBox','readonly':'readOnly',
 'autofocus':'autoFocus','tabindex':'tabIndex','maxlength':'maxLength','minlength':'minLength',
 'fill-rule':'fillRule','clip-rule':'clipRule','stroke-width':'strokeWidth','stroke-linecap':'strokeLinecap',
 'stroke-linejoin':'strokeLinejoin','fill-opacity':'fillOpacity','stroke-opacity':'strokeOpacity',
 'stroke-dasharray':'strokeDasharray','stroke-dashoffset':'strokeDashoffset','stop-color':'stopColor',
 'stop-opacity':'stopOpacity','clip-path':'clipPath','text-anchor':'textAnchor','font-size':'fontSize',
 'font-family':'fontFamily','font-weight':'fontWeight','marker-end':'markerEnd','marker-start':'markerStart',
 'gradientunits':'gradientUnits','gradienttransform':'gradientTransform','preserveaspectratio':'preserveAspectRatio',
 'accept-charset':'acceptCharset','http-equiv':'httpEquiv','playsinline':'playsInline','autoplay':'autoPlay',
 'referrerpolicy':'referrerPolicy','fetchpriority':'fetchPriority'
}
def css_to_obj(css):
    items=[]
    for decl in css.split(';'):
        if ':' not in decl: continue
        k,v=decl.split(':',1)
        k=k.strip(); v=v.strip().replace('"','\\"')
        if k.startswith('--'): key='"'+k+'"'
        else: key=re.sub(r'-([a-z])',lambda m:m.group(1).upper(),k)
        items.append(f'{key}: "{v}"')
    return '{{'+', '.join(items)+'}}'
for p in pages:
    fp=f'main-app/app/{p}/page.tsx'
    if not os.path.exists(fp): continue
    s=open(fp,encoding='utf-8').read(); o=s
    for k,v in simple.items():
        s=re.sub(r'(?<=[\s"\'])'+re.escape(k)+r'=(?=["{])', v+'=', s)
    s=re.sub(r'\bstyle="([^"{}]*)"', lambda m: 'style='+css_to_obj(m.group(1)), s)
    s=re.sub(r'\b(checked|selected)=""', lambda m:'defaultChecked' if m.group(1)=='checked' else 'defaultValue', s)
    if s!=o:
        open(fp,'w',encoding='utf-8').write(s); print('fixed',fp)
