using System;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

public struct ProductionStepKey
{
    public int? StartStateId { get; }
    public int? EndStateId { get; }

    public ProductionStepKey(int? startStateId, int? endStateId)
    {
        StartStateId = startStateId;
        EndStateId = endStateId;
    }

    public bool Equals(ProductionStepKey other)
    {
        return StartStateId == other.StartStateId && EndStateId == other.EndStateId;
    }

    public override bool Equals(object obj)
    {
        return obj is ProductionStepKey other && Equals(other);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(StartStateId, EndStateId);
    }

    public static bool operator ==(ProductionStepKey left, ProductionStepKey right)
    {
        return left.Equals(right);
    }

    public static bool operator !=(ProductionStepKey left, ProductionStepKey right)
    {
        return !(left == right);
    }
}