"""add_employee_asset_tables

Revision ID: 2ca09a98bd4b
Revises: 1ca09a98bd4a
Create Date: 2026-07-30 22:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '2ca09a98bd4b'
down_revision: Union[str, None] = '1ca09a98bd4a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('employee',
        sa.Column('id', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('name', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('role', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('station', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.Column('email', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('phone', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('start_date', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('tenant_id', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('employee', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_employee_tenant_id'), ['tenant_id'], unique=False)

    op.create_table('asset',
        sa.Column('id', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('name', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('health_pct', sa.Float(), nullable=False),
        sa.Column('last_service', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('next_service', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('category', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('uptime_pct', sa.Float(), nullable=False),
        sa.Column('hours_operated', sa.Float(), nullable=False),
        sa.Column('energy_consumption', sa.Float(), nullable=False),
        sa.Column('critical_count', sa.Integer(), nullable=False),
        sa.Column('tenant_id', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('asset', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_asset_tenant_id'), ['tenant_id'], unique=False)


def downgrade() -> None:
    with op.batch_alter_table('asset', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_asset_tenant_id'))
    op.drop_table('asset')
    with op.batch_alter_table('employee', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_employee_tenant_id'))
    op.drop_table('employee')
