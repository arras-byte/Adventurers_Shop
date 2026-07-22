import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const passphrase = Deno.env.get("ADMIN_PASSPHRASE");
    if (!passphrase) {
      return Response.json({ error: 'Admin passphrase not configured' }, { status: 500 });
    }
    if (body.passphrase !== passphrase) {
      return Response.json({ error: 'Wrong passphrase' }, { status: 403 });
    }

    const action = body.action;

    if (action === 'verify') {
      return Response.json({ ok: true });
    }

    if (action === 'create') {
      const created = await base44.asServiceRole.entities.BlogPost.create(body.data);
      return Response.json({ ok: true, post: created });
    }

    if (action === 'update') {
      const updated = await base44.asServiceRole.entities.BlogPost.update(body.id, body.data);
      return Response.json({ ok: true, post: updated });
    }

    if (action === 'delete') {
      await base44.asServiceRole.entities.BlogPost.delete(body.id);
      return Response.json({ ok: true });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});