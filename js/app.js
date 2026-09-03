let editoriaAtual = 'todas';

// Helper para remover acentos e caracteres especiais da busca
function normalizarTexto(texto) {
  return (texto || '')
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Substitua a função render() inteira por esta:
function render() {
  const grid = document.getElementById('grid');
  if (!grid) return;

  const buscaInput = document.getElementById('search-input');
  const termoBusca = buscaInput ? normalizarTexto(buscaInput.value) : '';

  const elencoFiltrado = ELENCO.filter(p => {
    const bateEditoria = editoriaAtual === 'todas' || (p.editorias && p.editorias.includes(editoriaAtual));
    const nomeNorm = normalizarTexto(p.nome);
    const idNorm = normalizarTexto(p.identidade);
    const bateBusca = !termoBusca || nomeNorm.includes(termoBusca) || idNorm.includes(termoBusca);

    return bateEditoria && bateBusca;
  });

  const contadorEl = document.getElementById('contador');
  if (contadorEl) {
    contadorEl.textContent = String(elencoFiltrado.length).padStart(2, '0');
  }

  if (elencoFiltrado.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; padding: 3rem 1rem; text-align: center; color: var(--text-muted);">
        <p style="font-size: 1.1rem; font-weight: 700; color: var(--verde-profundo);">Nenhum personagem encontrado para esta busca.</p>
        <p style="font-size: 0.85rem; margin-top: 0.5rem;">Verifique o nome digitado ou selecione a opção "Todas" nas editorias.</p>
      </div>`;
    return;
  }

  grid.innerHTML = elencoFiltrado.map((p, i) => {
    const fotoPrincipal = (p.fotos && p.fotos.length > 0) ? p.fotos[0] : './img/placeholder.jpeg';
    const temMultiplasPoses = p.fotos && p.fotos.length > 1;

    return `
    <article class="card" data-id="${p.id}">
      <div class="card__imgwrap">
        <img id="img-${p.id}" src="${fotoPrincipal}" alt="${p.nome}" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/400x500/12332A/E9F270?text=${encodeURIComponent(p.nome)}';">
        <span class="card__num">${String(i + 1).padStart(2, '0')}</span>
        
        <!-- Botão Translúcido de Download -->
       <button type="button" id="btn-download-${p.id}" onclick="baixarImagemDirect('${fotoPrincipal}', '${p.id}-referencia.jpeg')" class="card__download-btn" title="Baixar esta imagem de referência">
  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
  Baixar
</button>
      </div>
      
      ${temMultiplasPoses ? `
      <div class="card__poses">
        ${p.fotos.map((foto, idx) => `
          <img src="${foto}" class="pose-thumb ${idx === 0 ? 'active' : ''}" onclick="trocarFoto('${p.id}', '${foto}', this)" alt="Pose ${idx+1}">
        `).join('')}
      </div>` : ''}

      <div class="card__body">
        <div class="card__head">
          <h2 class="card__name">${p.nome}</h2>
          <span class="card__age">${p.idade}<small>anos</small></span>
        </div>
        <p class="card__id">${p.identidade}</p>
        <div class="card__tags">
          ${p.editorias.map(e => `
            <span class="tag" style="background:${CORES_EDITORIAS[e] === '#12332A' ? '#12332A' : '#ffffff'}; color:${CORES_EDITORIAS[e] === '#12332A' ? '#E9F270' : '#12332A'}; border: 1px solid var(--line-color);">
              <i style="background:${CORES_EDITORIAS[e]}"></i>${e}
            </span>
          `).join('')}
        </div>
        <details class="ficha">
          <summary>Ficha técnica (EN) <span>⌄</span></summary>
          <div class="ficha__txt">${p.en}</div>
          <button class="btn-mini" onclick="copiarFicha('${p.id}')">Copiar para o bloco [Consistência]</button>
        </details>
        <div class="card__actions">
          <button class="btn btn--primary" onclick="escolherPorId('${p.id}', 'usar')">Criar cenas com ${p.nome}</button>
          <button class="btn btn--ghost" onclick="escolherPorId('${p.id}', 'base')">Usar como base p/ novo</button>
        </div>
      </div>
    </article>`;
  }).join('') + `
    <div class="newchar">
      <div class="newchar__txt">
        <h3>Nenhum deles?</h3>
        <p>Crie um personagem novo do zero seguindo a estética e diretrizes da marca personowfit. O agente vai te guiar pelas características e gerar a matriz visual em fundo neutro.</p>
      </div>
      <button class="btn btn--primary" onclick="escolherPorId(null, 'novo')">Criar do zero</button>
    </div>`;
}

function trocarFoto(id, novaSrc, el) {
  const imgEl = document.getElementById(`img-${id}`);
  if (imgEl) imgEl.src = novaSrc;

  // Atualiza a ação do botão de download para a nova pose selecionada
  const btnDownload = document.getElementById(`btn-download-${id}`);
  if (btnDownload) {
    btnDownload.setAttribute('onclick', `baixarImagemDirect('${novaSrc}', '${id}-referencia.jpeg')`);
  }

  const parent = el.parentElement;
  if (parent) {
    parent.querySelectorAll('.pose-thumb').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }
}

function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.innerHTML = msg;
  t.classList.add('show');
  clearTimeout(window._tt);
  window._tt = setTimeout(() => t.classList.remove('show'), 4000);
}

function copiar(txt, msg) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(txt).then(() => toast(msg)).catch(() => fallbackCopy(txt, msg));
  } else {
    fallbackCopy(txt, msg);
  }
}

function fallbackCopy(txt, msg) {
  const ta = document.createElement('textarea');
  ta.value = txt;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    toast(msg);
  } catch (e) {
    toast('Erro ao copiar texto.');
  }
  document.body.removeChild(ta);
}

function copiarFicha(id) {
  const p = ELENCO.find(item => item.id === id);
  if (p) {
    copiar(p.en, `Ficha técnica de <strong>${p.nome}</strong> copiada para a área de transferência!`);
  }
}

function escolherPorId(id, modo) {
  let instrucao, msg;
  if (modo === 'usar') {
    const p = ELENCO.find(item => item.id === id);
    const nome = p ? p.nome : 'o personagem';
    instrucao = `Quero criar cenas com ${nome}.`;
    msg = `Instrução copiada: "<strong>${instrucao}</strong>". Cole no agente de IA.`;
  } else if (modo === 'base') {
    const p = ELENCO.find(item => item.id === id);
    const nome = p ? p.nome : 'o personagem';
    instrucao = `Quero criar um personagem novo a partir de ${nome}, mantendo a estética da marca personowfit.`;
    msg = `Instrução copiada. Cole no agente e descreva as alterações desejadas.`;
  } else {
    instrucao = 'Quero criar um personagem novo do zero seguindo a estética da marca personowfit.';
    msg = 'Instrução copiada. Cole no agente para iniciar o roteiro de criação.';
  }
  copiar(instrucao, msg);
}

function filtrarEditoria(editoria, btn) {
  editoriaAtual = editoria;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  render();
}

function filtrarElenco() {
  render();
}

// Inicializa a renderização de todos os personagens assim que a página carrega
document.addEventListener('DOMContentLoaded', () => {
  render();
});
function baixarImagemDirect(url, nomeArquivo) {
  // 1. Tenta realizar o download via fetch + blob (padrão para servidor web HTTP/HTTPS)
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Falha no fetch');
      return response.blob();
    })
    .then(blob => {
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = nomeArquivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch(() => {
      // 2. Fallback inteligente para testes locais (file://): converte a imagem em Data URL via Canvas
      // Isso força o download direto sem recarregar ou navegar para fora da página
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function() {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 1.0);
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = nomeArquivo;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (e) {
          // 3. Trava de segurança final: Se tudo falhar, abre em nova aba (NUNCA na aba atual)
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      };
      img.onerror = function() {
        // Trava de segurança final: abre em nova aba
        window.open(url, '_blank', 'noopener,noreferrer');
      };
      img.src = url;
    });
}