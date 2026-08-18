import { useState } from "react";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { Button } from "@/components/ui/button";

export default function AiManagerPage() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-md bg-blue-500/15 p-2">
              <ForwardedIconComponent name="ShoppingCart" className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="font-semibold">Auto-Procurement</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            IA negocia autonomamente com fornecedores e repõe insumos quando os níveis estão críticos.
          </p>
          <div className="mt-3 rounded-md bg-muted p-2 text-xs text-muted-foreground">
            Última negociação: Economia de 12% com CEASA Hortifrúti
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-md bg-purple-500/15 p-2">
              <ForwardedIconComponent name="ScanEye" className="h-5 w-5 text-purple-500" />
            </div>
            <h3 className="font-semibold">Quality Audit</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Visão computacional para auditoria de qualidade dos produtos em tempo real.
          </p>
          <div className="mt-3 rounded-md bg-muted p-2 text-xs text-muted-foreground">
            Última auditoria: 92% conformidade ANVISA RDC 216
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-md bg-emerald-500/15 p-2">
              <ForwardedIconComponent name="HeartPulse" className="h-5 w-5 text-emerald-500" />
            </div>
            <h3 className="font-semibold">Asset Health</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Manutenção preditiva baseada em dados históricos e sensores dos ativos.
          </p>
          <div className="mt-3 rounded-md bg-muted p-2 text-xs text-muted-foreground">
            Próxima manutenção: Câmara Frigorífica (01/08)
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">Daily Closing Report</h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Relatório diário de fechamento com resumo das operações do dia.
        </p>

        <div className="mb-6 flex items-center gap-4">
          <Button
            onClick={handleSend}
            disabled={sending}
            className="gap-2"
          >
            {sending ? (
              <>
                <ForwardedIconComponent name="Loader" className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : sent ? (
              <>
                <ForwardedIconComponent name="CheckCircle2" className="h-4 w-4" />
                Enviado!
              </>
            ) : (
              <>
                <ForwardedIconComponent name="Send" className="h-4 w-4" />
                Force Send
              </>
            )}
          </Button>
          <div className="flex items-center gap-2">
            <ForwardedIconComponent name="MessageSquare" className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">WhatsApp</span>
            <span className="text-muted-foreground">·</span>
            <ForwardedIconComponent name="Mail" className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Email</span>
          </div>
        </div>

        <div className="mx-auto max-w-sm rounded-2xl border bg-muted/30 p-4 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                IA
              </div>
              <div>
                <p className="text-sm font-semibold">Operations Assistant</p>
                <p className="text-xs text-muted-foreground">online</p>
              </div>
            </div>
            <ForwardedIconComponent name="EllipsisVertical" className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="rounded-xl bg-primary/10 p-3 text-sm">
            <p className="mb-2 font-semibold">📊 Resumo do Dia - 19/07</p>
            <p>🏭 Produção: 47 ordens</p>
            <p>💰 Faturamento: R$ 28.450,00</p>
            <p>✅ Qualidade: 96%</p>
            <p>⚠️ Alertas: 2 itens críticos</p>
            <p className="mt-2 text-xs text-muted-foreground">10:30 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
